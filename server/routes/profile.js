import express from 'express';
import crypto from 'crypto';
import { matchSchemes } from '../services/schemeMatcher.js';
import { AppError } from '../middleware/errorHandler.js';

const router = express.Router();

// In-memory profile storage
const profileStore = new Map();

// Seed realistic demo profiles for hackathon testing & instant evaluation
const sampleProfiles = [
  {
    id: 'demo-ramesh-vendor',
    name: 'Ramesh Kumar',
    age: 38,
    gender: 'Male',
    category: 'OBC',
    state: 'Delhi',
    district: 'North East Delhi',
    businessType: 'street_vendor',
    annualIncome: 140000,
    existingBusiness: true,
    education: 'primary',
    phone: '9876543210',
    description: 'Runs a fruit and vegetable cart near Seelampur metro station for 8 years',
    createdAt: new Date().toISOString()
  },
  {
    id: 'demo-sunita-weaver',
    name: 'Sunita Devi',
    age: 32,
    gender: 'Female',
    category: 'SC',
    state: 'Uttar Pradesh',
    district: 'Varanasi',
    businessType: 'handloom_weaver',
    annualIncome: 95000,
    existingBusiness: true,
    education: '8th_pass',
    phone: '9812345678',
    description: 'Weaver producing silk sarees and dupattas on traditional handloom',
    createdAt: new Date().toISOString()
  },
  {
    id: 'demo-anita-shg',
    name: 'Anita Bai',
    age: 41,
    gender: 'Female',
    category: 'ST',
    state: 'Madhya Pradesh',
    district: 'Dindori',
    businessType: 'dairy',
    annualIncome: 80000,
    existingBusiness: true,
    education: 'none',
    phone: '9754321980',
    description: 'Member of Jai Maa Durga Self Help Group running small milk collection and goat rearing',
    createdAt: new Date().toISOString()
  },
  {
    id: 'demo-arjun-carpenter',
    name: 'Arjun Mistry',
    age: 28,
    gender: 'Male',
    category: 'OBC',
    state: 'Rajasthan',
    district: 'Jodhpur',
    businessType: 'artisan',
    annualIncome: 180000,
    existingBusiness: true,
    education: '10th_pass',
    phone: '9654123890',
    description: 'Traditional wood carver and furniture repair craftsman',
    createdAt: new Date().toISOString()
  }
];

// Seed profiles into Map
sampleProfiles.forEach(p => profileStore.set(p.id, p));

/**
 * GET /api/profile
 * Lists all active profiles
 */
router.get('/', (req, res) => {
  const allProfiles = Array.from(profileStore.values());
  res.json({
    success: true,
    count: allProfiles.length,
    profiles: allProfiles
  });
});

/**
 * POST /api/profile
 * Creates a new user profile
 */
router.post('/', (req, res, next) => {
  try {
    if (!req.body || typeof req.body !== 'object' || Array.isArray(req.body)) {
      throw AppError.badRequest('Request body must be a JSON object');
    }

    const {
      name,
      age,
      gender,
      category,
      state,
      district,
      businessType,
      annualIncome,
      existingBusiness = false,
      education = 'none',
      phone = '',
      description = ''
    } = req.body;

    if (!name || typeof name !== 'string' || name.trim().length === 0) {
      throw AppError.badRequest('Applicant "name" is required');
    }

    const id = req.body.id || `user-${crypto.randomUUID().slice(0, 8)}`;
    const parsedAge = Number(age);
    const parsedIncome = Number(annualIncome);

    const newProfile = {
      id,
      name: name.trim(),
      age: (!isNaN(parsedAge) && age !== null && age !== '') ? parsedAge : 30,
      gender: gender || 'All',
      category: category || 'General',
      state: state || 'All India',
      district: district || '',
      businessType: businessType || 'retail',
      annualIncome: (!isNaN(parsedIncome) && annualIncome !== null && annualIncome !== '') ? Math.max(0, parsedIncome) : 0,
      existingBusiness: Boolean(existingBusiness),
      education: education || 'none',
      phone: phone || '',
      description: description || '',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    profileStore.set(id, newProfile);

    // Also calculate initial scheme matches for convenience
    const matches = matchSchemes(newProfile);

    res.status(201).json({
      success: true,
      message: 'Profile created successfully',
      data: newProfile,
      topMatches: matches.slice(0, 3)
    });
  } catch (error) {
    next(error);
  }
});

/**
 * GET /api/profile/:id
 * Fetches profile by ID
 */
router.get('/:id', (req, res, next) => {
  const { id } = req.params;
  const profile = profileStore.get(id);

  if (!profile) {
    return next(AppError.notFound(`Profile with id "${id}" not found`));
  }

  res.json({
    success: true,
    data: profile
  });
});

/**
 * PUT /api/profile/:id
 * Updates an existing profile
 */
router.put('/:id', (req, res, next) => {
  try {
    if (!req.body || typeof req.body !== 'object' || Array.isArray(req.body)) {
      throw AppError.badRequest('Request body must be a JSON object');
    }

    const { id } = req.params;
    const existing = profileStore.get(id);

    if (!existing) {
      return next(AppError.notFound(`Profile with id "${id}" not found`));
    }

    const updatedProfile = {
      ...existing,
      ...req.body,
      id, // keep immutable id
      age: req.body.age !== undefined && !isNaN(Number(req.body.age)) ? Number(req.body.age) : existing.age,
      annualIncome: req.body.annualIncome !== undefined && !isNaN(Number(req.body.annualIncome)) ? Math.max(0, Number(req.body.annualIncome)) : existing.annualIncome,
      existingBusiness: req.body.existingBusiness !== undefined ? Boolean(req.body.existingBusiness) : existing.existingBusiness,
      updatedAt: new Date().toISOString()
    };

    profileStore.set(id, updatedProfile);

    res.json({
      success: true,
      message: 'Profile updated successfully',
      data: updatedProfile
    });
  } catch (error) {
    next(error);
  }
});

/**
 * GET /api/profile/:id/matches
 * Directly returns matched schemes for a saved profile
 */
router.get('/:id/matches', (req, res, next) => {
  const { id } = req.params;
  const profile = profileStore.get(id);

  if (!profile) {
    return next(AppError.notFound(`Profile with id "${id}" not found`));
  }

  const matches = matchSchemes(profile);

  res.json({
    success: true,
    profile,
    summary: {
      total: matches.length,
      highlyEligible: matches.filter(m => m.eligibilityStatus === 'Highly Eligible').length,
      eligible: matches.filter(m => m.eligibilityStatus === 'Eligible').length,
      potentiallyEligible: matches.filter(m => m.eligibilityStatus === 'Potentially Eligible').length
    },
    matches
  });
});

export default router;
