import { schemes } from './schemeData.js';

/**
 * Normalizes input string for comparison
 */
function normalize(str) {
  if (typeof str !== 'string') {
    if (str === null || str === undefined) return '';
    if (typeof str === 'number' || typeof str === 'boolean') return String(str).toLowerCase().trim();
    return '';
  }
  return str.toLowerCase().trim();
}

/**
 * Checks if user's education satisfies scheme requirement
 */
const EDUCATION_LEVELS = {
  'none': 0,
  'primary': 1,
  '8th_pass': 2,
  '10th_pass': 3,
  '12th_pass': 4,
  'diploma': 5,
  'graduate': 6,
  'post_graduate': 7
};

function satisfiesEducation(userEdu, requiredEdu) {
  if (!requiredEdu || requiredEdu === 'any') return true;
  const userRank = EDUCATION_LEVELS[normalize(userEdu)] || 0;
  const requiredRank = EDUCATION_LEVELS[normalize(requiredEdu)] || 0;
  return userRank >= requiredRank;
}

/**
 * Maps common business terms to standard business types
 */
const BUSINESS_TYPE_SYNONYMS = {
  'street_vendor': ['street_vendor', 'thela', 'rehri', 'patari', 'hawker', 'food_stall', 'fruit_vegetable_vendor', 'chai_stall', 'vendor'],
  'artisan': ['artisan', 'craftsperson', 'carpenter', 'blacksmith', 'potter', 'sculptor', 'cobbler', 'mason', 'basket_maker', 'toy_maker', 'barber', 'garland_maker', 'washerman', 'tailor', 'fishing_net_maker', 'handicrafts'],
  'farmer': ['farmer', 'agriculture', 'small_farmer', 'marginal_farmer', 'horticulture', 'organic_farming', 'kisan'],
  'dairy': ['dairy', 'milk_processing', 'cattle_feed', 'meat_processing', 'veterinary_clinic', 'poultry_farm', 'goat_rearing', 'fpo'],
  'food_processing': ['food_processing', 'spices_grinding', 'pickle_making', 'bakery', 'flour_mill', 'oil_expeller', 'dairy_products', 'fruit_pulp', 'snack_manufacturing', 'canteen'],
  'textiles': ['textiles', 'garmenting', 'tailoring', 'embroidery', 'handloom', 'handicrafts', 'apparel', 'knitting', 'boutique_tailoring'],
  'handloom_weaver': ['handloom_weaver', 'textile_weaver', 'yarn_spinner', 'dyer', 'allied_handloom_worker', 'carpet_weaver', 'silk_weaver', 'weaver'],
  'manufacturing': ['manufacturing', 'repair_workshop', 'packaging', 'wood_paper', 'chemical_soap', 'engineering', 'hardware'],
  'services': ['services', 'retail', 'repair_shop', 'small_trading', 'transport_vehicle', 'digital_services', 'beauty_wellness'],
  'technology': ['technology', 'agritech', 'foodtech', 'healthtech', 'clean_energy', 'social_impact', 'hardware', 'ai_software', 'rural_innovation', 'startup'],
  'fisheries': ['fisheries', 'aquaculture', 'fish_farming', 'biofloc', 'fish_feed', 'cold_storage_transport', 'fish_retail', 'ornamental_fish'],
  'coir': ['coir', 'rope_making', 'mat_weaving', 'agro_waste', 'fiber_spinning']
};

function matchesBusinessType(userBiz, schemeBizTypes, scheme = null) {
  if (!schemeBizTypes || schemeBizTypes.length === 0 || schemeBizTypes.includes('any')) {
    return { matches: true, score: 25, reason: 'Scheme accepts any business activity' };
  }

  const normalizedUser = normalize(userBiz);

  // Check if scheme has dedicated trade specialization for this business
  const isSpecializedTrade = scheme && (
    (normalizedUser === 'artisan' && scheme.id === 'pm-vishwakarma') ||
    (normalizedUser === 'street_vendor' && scheme.id === 'pm-svanidhi') ||
    (normalizedUser === 'farmer' && scheme.id === 'pm-kisan') ||
    (normalizedUser === 'dairy' && scheme.id === 'dairy-ahidf') ||
    (normalizedUser === 'fisheries' && scheme.id === 'pm-matsya-sampada') ||
    (normalizedUser === 'handloom_weaver' && (scheme.id === 'weaver-mudra' || scheme.id === 'samarth-scheme')) ||
    (normalizedUser === 'food_processing' && scheme.id === 'pm-fme')
  );

  // Direct match
  if (schemeBizTypes.some(t => normalize(t) === normalizedUser)) {
    const score = isSpecializedTrade ? 37 : 35;
    return { matches: true, score, reason: `Exact match for your business type (${userBiz})` };
  }

  // Synonym / cluster match
  for (const [category, synonyms] of Object.entries(BUSINESS_TYPE_SYNONYMS)) {
    const userInCluster = synonyms.some(s => s === normalizedUser || (normalizedUser && normalizedUser.includes(s)));
    const schemeInCluster = schemeBizTypes.some(t => synonyms.includes(normalize(t)));

    if (userInCluster && schemeInCluster) {
      const score = isSpecializedTrade ? 32 : 30;
      return { matches: true, score, reason: `Matches your broad industry sector (${category.replace('_', ' ')})` };
    }
  }

  // General MSME schemes that accept micro businesses
  const generalMSME = ['manufacturing', 'retail', 'services', 'small_trading'];
  if (schemeBizTypes.some(t => generalMSME.includes(t))) {
    return { matches: true, score: 20, reason: 'Eligible under general micro-enterprise commercial criteria' };
  }

  return { matches: false, score: 5, reason: 'Business type is outside the primary target trade of this scheme' };
}

/**
 * Matches a user profile against all schemes and returns ranked results
 * @param {Object} profile User profile
 * @returns {Array} Sorted scheme matches with detailed scores and reasons
 */
export function matchSchemes(profile = {}) {
  const {
    name = 'Entrepreneur',
    age = 30,
    gender = 'All',
    category = 'General',
    state = '',
    district = '',
    businessType = 'retail',
    annualIncome = 200000,
    existingBusiness = false,
    education = 'none'
  } = (profile && typeof profile === 'object' && !Array.isArray(profile)) ? profile : {};

  const results = schemes.map(scheme => {
    let score = 0;
    const matchReasons = [];
    const cautionPoints = [];
    const breakdown = {
      businessType: 0,
      category: 0,
      gender: 0,
      income: 0,
      age: 0,
      stageEducation: 0
    };

    let isDisqualified = false;
    let disqualificationReason = '';

    const crit = scheme.eligibilityCriteria || {};

    // 1. Business Type Scoring (Max 35 points + 2 bonus for specialized flagship)
    const bizCheck = matchesBusinessType(businessType, crit.businessTypes, scheme);
    breakdown.businessType = bizCheck.score;
    score += bizCheck.score;
    if (bizCheck.matches) {
      matchReasons.push(bizCheck.reason);
    } else {
      cautionPoints.push('Your trade may require alignment with targeted occupational activities.');
    }

    // 2. Social Category Scoring (Max 20 points)
    const normalizedUserCat = normalize(category);
    const schemeCats = (crit.category || ['All']).map(normalize);

    if (normalizedUserCat && normalizedUserCat !== 'all' && schemeCats.includes(normalizedUserCat)) {
      breakdown.category = 20;
      score += 20;
      matchReasons.push(`Priority allocation / special quota available for ${category} category`);
    } else if (schemeCats.includes('all')) {
      breakdown.category = 16;
      score += 16;
      matchReasons.push(`Open to all social categories including ${category}`);
    } else {
      // Disqualified if category is strict and user doesn't belong
      if (!schemeCats.includes('all') && !schemeCats.includes(normalizedUserCat)) {
        isDisqualified = true;
        disqualificationReason = `Exclusively reserved for ${schemeCats.join('/')} community entrepreneurs.`;
      }
      breakdown.category = 0;
      cautionPoints.push(`Scheme specifically targets ${schemeCats.join('/')} communities.`);
    }

    // 3. Gender Scoring (Max 15 points)
    const normalizedUserGender = normalize(gender);
    const schemeGenders = (crit.gender || ['All']).map(normalize);

    if (normalizedUserGender && normalizedUserGender !== 'all' && schemeGenders.includes(normalizedUserGender)) {
      breakdown.gender = 15;
      score += 15;
      matchReasons.push(`Special focus & maximum subsidy entitlement for ${gender} entrepreneurs`);
    } else if (schemeGenders.includes('all')) {
      breakdown.gender = 12;
      score += 12;
      matchReasons.push('Available to entrepreneurs of all genders');
    } else {
      // If female only and applicant is male
      if (schemeGenders.includes('female') && normalizedUserGender === 'male') {
        isDisqualified = true;
        disqualificationReason = 'Exclusively dedicated to women entrepreneurs / SHGs.';
        breakdown.gender = 0;
        cautionPoints.push('This scheme is exclusively designed for female applicants.');
      } else {
        breakdown.gender = 5;
      }
    }

    // Special condition: Stand-Up India is strictly for SC/ST OR Women
    if (scheme.id === 'stand-up-india') {
      const isSCorST = normalizedUserCat === 'sc' || normalizedUserCat === 'st';
      const isFemale = normalizedUserGender === 'female';
      if (!isSCorST && !isFemale) {
        isDisqualified = true;
        disqualificationReason = 'Stand-Up India is strictly reserved for SC/ST or Women entrepreneurs.';
        breakdown.category = 0;
        breakdown.gender = 0;
        cautionPoints.unshift('Stand-Up India is strictly reserved for SC/ST or Women entrepreneurs.');
      }
    }

    // 4. Annual Income Scoring (Max 15 points)
    const parsedIncome = Number(annualIncome);
    const numIncome = (!isNaN(parsedIncome) && annualIncome !== null && annualIncome !== '') ? Math.max(0, parsedIncome) : 0;
    if (crit.annualIncomeLimit === null || crit.annualIncomeLimit === undefined) {
      breakdown.income = 13;
      score += 13;
      matchReasons.push('No restrictive family income ceiling');
    } else if (numIncome <= crit.annualIncomeLimit) {
      breakdown.income = 15;
      score += 15;
      matchReasons.push(`Annual income (₹${numIncome.toLocaleString('en-IN')}) is well within the ceiling limit of ₹${crit.annualIncomeLimit.toLocaleString('en-IN')}`);
    } else if (numIncome <= crit.annualIncomeLimit * 1.15) {
      breakdown.income = 6;
      score += 6;
      cautionPoints.push(`Annual income is marginally above the standard limit of ₹${crit.annualIncomeLimit.toLocaleString('en-IN')}; requires special income certificate verification.`);
    } else {
      breakdown.income = 0;
      cautionPoints.push(`Annual income exceeds scheme threshold of ₹${crit.annualIncomeLimit.toLocaleString('en-IN')}.`);
    }

    // 5. Age Scoring (Max 10 points)
    const parsedAge = Number(age);
    const numAge = (!isNaN(parsedAge) && age !== null && age !== '') ? parsedAge : 30;
    const minAge = crit.minAge || 18;
    const maxAge = crit.maxAge || 70;

    if (numAge >= minAge && numAge <= maxAge) {
      breakdown.age = 10;
      score += 10;
      matchReasons.push(`Applicant age (${numAge} yrs) fits the eligible bracket of ${minAge}-${maxAge} years`);
    } else if (Math.abs(numAge - minAge) <= 2 || Math.abs(numAge - maxAge) <= 2) {
      breakdown.age = 4;
      score += 4;
      cautionPoints.push(`Applicant age (${numAge} yrs) is near boundary limit (${minAge}-${maxAge} years).`);
    } else {
      breakdown.age = 0;
      cautionPoints.push(`Applicant age (${numAge} yrs) falls outside eligible bracket (${minAge}-${maxAge} years).`);
    }

    // 6. Business Stage & Education (Max 5 points)
    let stageEduScore = 0;
    const reqStage = crit.existingBusiness || 'any';
    const isStageSpecified = profile && typeof profile === 'object' && profile.existingBusiness !== undefined;

    if (!isStageSpecified || reqStage === 'any') {
      stageEduScore += 3;
    } else if (reqStage === 'existing_only' && existingBusiness) {
      stageEduScore += 3;
      matchReasons.push('Suitable for expanding existing active operations');
    } else if (reqStage === 'new_only' && !existingBusiness) {
      stageEduScore += 3;
      matchReasons.push('Designed for greenfield (new) micro ventures');
    } else {
      stageEduScore += 1;
      cautionPoints.push(`Scheme targets ${reqStage === 'new_only' ? 'brand new ventures' : 'existing active businesses'}.`);
    }

    if (satisfiesEducation(education, crit.education)) {
      stageEduScore += 2;
    } else {
      cautionPoints.push(`Requires minimum qualification of ${crit.education.replace('_', ' ')}.`);
    }

    breakdown.stageEducation = stageEduScore;
    score += stageEduScore;

    // Apply strict disqualification caps
    if (isDisqualified) {
      score = Math.min(score, 25);
      matchReasons.length = 0;
      cautionPoints.unshift(disqualificationReason);
    }

    // Normalize final score between 0 and 100
    const finalScore = Math.min(Math.max(Math.round(score), 0), 100);

    // Determine status bucket
    let eligibilityStatus = 'Not Eligible';
    let eligibilityStatusHi = 'अपात्र';

    if (finalScore >= 80) {
      eligibilityStatus = 'Highly Eligible';
      eligibilityStatusHi = 'सर्वोच्च पात्रता (अत्यधिक उपयुक्त)';
    } else if (finalScore >= 60) {
      eligibilityStatus = 'Eligible';
      eligibilityStatusHi = 'पात्र (उपयुक्त)';
    } else if (finalScore >= 40) {
      eligibilityStatus = 'Potentially Eligible';
      eligibilityStatusHi = 'संभावित पात्रता (शर्तों के अधीन)';
    }

    return {
      scheme,
      matchScore: finalScore,
      eligibilityStatus,
      eligibilityStatusHi,
      isDisqualified,
      matchReasons,
      cautionPoints,
      breakdown
    };
  });

  // Sort descending by score
  results.sort((a, b) => b.matchScore - a.matchScore);

  return results;
}

export default { matchSchemes };
