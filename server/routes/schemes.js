import express from 'express';
import { schemes } from '../services/schemeData.js';
import { matchSchemes } from '../services/schemeMatcher.js';
import tinyfish from '../services/tinyfish.js';
import { AppError } from '../middleware/errorHandler.js';

const router = express.Router();

/**
 * GET /api/schemes/categories
 * Returns metadata lists for filter dropdowns (categories, business types, ministries, etc.)
 */
router.get('/categories', (req, res) => {
  const categories = [...new Set(schemes.map(s => s.category))].sort();
  const ministries = [...new Set(schemes.map(s => s.ministry))].sort();

  const allBizTypes = new Set();
  schemes.forEach(s => {
    (s.eligibilityCriteria?.businessTypes || []).forEach(b => allBizTypes.add(b));
  });

  const businessTypes = [
    { value: 'street_vendor', label: 'Street Vendor / Hawkers (रेहड़ी-पटरी)', icon: '🛒' },
    { value: 'artisan', label: 'Traditional Artisan / Craftsperson (दस्तकार/कारीगर)', icon: '🔨' },
    { value: 'farmer', label: 'Farmer / Agriculture (किसान/खेती)', icon: '🌾' },
    { value: 'food_processing', label: 'Food Processing & Bakery (खाद्य प्रसंस्करण)', icon: '🍲' },
    { value: 'handloom_weaver', label: 'Handloom & Textile Weaver (बुनकर/वस्त्र)', icon: '🧵' },
    { value: 'dairy', label: 'Dairy & Animal Husbandry (डेयरी/पशुपालन)', icon: '🥛' },
    { value: 'manufacturing', label: 'Manufacturing & Workshop (लघु उद्योग/कारखाना)', icon: '⚙️' },
    { value: 'retail', label: 'Retail & Grocery Store (दुकान/व्यापार)', icon: '🏪' },
    { value: 'services', label: 'Services & Repair (सेवाएं/मरम्मत कार्य)', icon: '🔧' },
    { value: 'fisheries', label: 'Fisheries & Aquaculture (मत्स्य पालन)', icon: '🐟' },
    { value: 'coir', label: 'Coir & Agro-fiber (नारियल रेशा/कॉयर)', icon: '🥥' },
    { value: 'technology', label: 'Tech & Rural Innovation Startup (स्टार्टअप/नवाचार)', icon: '💡' }
  ];

  res.json({
    success: true,
    data: {
      categories,
      ministries,
      businessTypes,
      socialCategories: ['General', 'OBC', 'SC', 'ST', 'Minority'],
      genders: ['All', 'Female', 'Male', 'Transgender'],
      totalSchemes: schemes.length
    }
  });
});

/**
 * Helper to safely extract single string from query params
 */
const toStr = (v) => {
  if (Array.isArray(v)) return typeof v[0] === 'string' ? v[0].trim() : '';
  if (typeof v === 'string') return v.trim();
  return '';
};

/**
 * GET /api/schemes/search
 * Live search using TinyFish Search API combined with local scheme knowledge base
 */
router.get('/search', async (req, res, next) => {
  try {
    const rawQ = req.query.q ?? req.query.query;
    const query = toStr(rawQ);
    if (!query) {
      throw AppError.badRequest('Query parameter "q" or "query" is required');
    }

    const liveSearchResults = await tinyfish.searchSchemes(query);

    // Also match local schemes for fast cross-referencing
    const lowerQ = query.toLowerCase();
    const matchedCurated = schemes.filter(s => {
      const tagsStr = Array.isArray(s.tags) ? s.tags.join(' ') : '';
      const haystack = `${s.name || ''} ${s.nameHi || ''} ${s.description || ''} ${s.category || ''} ${tagsStr}`.toLowerCase();
      return haystack.includes(lowerQ);
    });

    res.json({
      success: true,
      query,
      curatedMatches: matchedCurated.length,
      curatedSchemes: matchedCurated,
      liveSearch: liveSearchResults
    });
  } catch (error) {
    next(error);
  }
});

/**
 * GET /api/schemes/fetch-details
 * Live extraction of clean markdown content from an official government scheme portal
 * Supports either ?url=... or ?schemeId=...
 */
router.get('/fetch-details', async (req, res, next) => {
  try {
    const rawUrl = toStr(req.query.url);
    const rawSchemeId = toStr(req.query.schemeId);

    let targetUrl = rawUrl;

    let targetScheme = null;
    if (rawSchemeId) {
      targetScheme = schemes.find(s => s.id === rawSchemeId);
      if (!targetScheme) {
        throw AppError.notFound(`Scheme with id "${rawSchemeId}" not found`);
      }
      if (!targetUrl) {
        targetUrl = targetScheme.applicationUrl || targetScheme.officialUrl;
      }
    }

    if (!targetUrl) {
      throw AppError.badRequest('Query parameter "url" or valid "schemeId" is required');
    }

    const details = await tinyfish.fetchSchemeDetails(targetUrl);
    if (targetScheme) {
      details.schemeId = targetScheme.id;
      details.schemeName = targetScheme.name;
      if (!details.title || details.title === 'Official Government Scheme Portal' || details.title === 'Scheme Details') {
        details.title = targetScheme.name;
      }
    }
    res.json({
      success: true,
      data: details
    });
  } catch (error) {
    next(error);
  }
});

/**
 * POST /api/schemes/automate
 * Runs automated web agent on government portals using TinyFish Agent API
 */
router.post('/automate', async (req, res, next) => {
  try {
    if (!req.body || typeof req.body !== 'object' || Array.isArray(req.body)) {
      throw AppError.badRequest('Request body must be a JSON object');
    }

    const { url, goal } = req.body;
    if (!url || !goal || typeof url !== 'string' || typeof goal !== 'string') {
      throw AppError.badRequest('Both "url" and "goal" string properties are required in the request body');
    }

    const automationResult = await tinyfish.automateSchemeDiscovery(url, goal);
    res.json({
      success: true,
      data: automationResult
    });
  } catch (error) {
    next(error);
  }
});

/**
 * POST /api/schemes/match
 * Matches schemes against a supplied user profile and ranks them by match score
 */
router.post('/match', (req, res, next) => {
  try {
    if (!req.body || typeof req.body !== 'object' || Array.isArray(req.body)) {
      throw AppError.badRequest('Request body must be a JSON object containing applicant profile');
    }

    const profile = req.body.profile || req.body;

    if (!profile || typeof profile !== 'object' || Array.isArray(profile)) {
      throw AppError.badRequest('A valid user profile object is required');
    }

    const matches = matchSchemes(profile);

    const highMatches = matches.filter(m => m.eligibilityStatus === 'Highly Eligible');
    const eligibleMatches = matches.filter(m => m.eligibilityStatus === 'Eligible');
    const potentialMatches = matches.filter(m => m.eligibilityStatus === 'Potentially Eligible');

    res.json({
      success: true,
      summary: {
        totalEvaluated: matches.length,
        highlyEligible: highMatches.length,
        eligible: eligibleMatches.length,
        potentiallyEligible: potentialMatches.length,
        topScheme: matches[0]?.scheme?.name || null
      },
      profile,
      matches
    });
  } catch (error) {
    next(error);
  }
});

/**
 * GET /api/schemes/:id
 * Fetches single scheme details by ID
 */
router.get('/:id', (req, res, next) => {
  const { id } = req.params;
  const scheme = schemes.find(s => s.id === id);

  if (!scheme) {
    return next(AppError.notFound(`Scheme with id "${id}" not found`));
  }

  res.json({
    success: true,
    data: scheme
  });
});

/**
 * GET /api/schemes
 * Lists schemes with optional filtering, search query, and pagination
 */
router.get('/', (req, res) => {
  const category = toStr(req.query.category);
  const gender = toStr(req.query.gender);
  const businessType = toStr(req.query.businessType);
  const search = toStr(req.query.search);
  const ministry = toStr(req.query.ministry);
  const page = req.query.page;
  const limit = req.query.limit;

  let filtered = [...schemes];

  if (category && category.toLowerCase() !== 'all') {
    const catLower = category.toLowerCase();
    filtered = filtered.filter(s => (s.category || '').toLowerCase().includes(catLower));
  }

  if (ministry && ministry.toLowerCase() !== 'all') {
    const minLower = ministry.toLowerCase();
    const shortMin = minLower.replace(/^ministry of\s+/i, '').trim();
    filtered = filtered.filter(s => {
      const sMin = (s.ministry || '').toLowerCase();
      return sMin.includes(minLower) || (shortMin.length >= 3 && sMin.includes(shortMin));
    });
  }

  if (gender && gender.toLowerCase() !== 'all') {
    const genLower = gender.toLowerCase();
    filtered = filtered.filter(s => {
      const allowed = (s.eligibilityCriteria?.gender || []).map(g => (g || '').toLowerCase());
      return allowed.includes('all') || allowed.includes(genLower);
    });
  }

  if (businessType && businessType.toLowerCase() !== 'all' && businessType.toLowerCase() !== 'any') {
    const bLower = businessType.toLowerCase();
    filtered = filtered.filter(s => {
      const allowed = (s.eligibilityCriteria?.businessTypes || []).map(b => (b || '').toLowerCase());
      return allowed.includes('any') || allowed.includes(bLower);
    });
  }

  if (search) {
    const term = search.toLowerCase();
    filtered = filtered.filter(s => {
      const tagsStr = Array.isArray(s.tags) ? s.tags.join(' ') : '';
      const corpus = `${s.name || ''} ${s.nameHi || ''} ${s.shortDescription || ''} ${s.description || ''} ${s.ministry || ''} ${s.category || ''} ${tagsStr}`.toLowerCase();
      return corpus.includes(term);
    });
  }

  // Pagination
  const pageNum = Math.max(parseInt(page, 10) || 1, 1);
  const limitNum = Math.max(parseInt(limit, 10) || 50, 1);
  const startIndex = (pageNum - 1) * limitNum;
  const paginatedResults = filtered.slice(startIndex, startIndex + limitNum);

  res.json({
    success: true,
    total: filtered.length,
    page: pageNum,
    limit: limitNum,
    totalPages: Math.ceil(filtered.length / limitNum),
    schemes: paginatedResults
  });
});

export default router;
