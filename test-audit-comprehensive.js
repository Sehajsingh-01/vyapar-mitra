import axios from 'axios';

const BASE_URL = 'http://localhost:5000';

async function runAudit() {
  console.log('===============================================================');
  console.log('   VYAPAR MITRA BACKEND & API 2-ROUND AUDIT SUITE');
  console.log('===============================================================');

  const results = [];

  async function executeTest(category, name, fn) {
    try {
      await fn();
      console.log(`✅ [${category}] PASS: ${name}`);
      results.push({ category, name, passed: true });
    } catch (err) {
      console.error(`❌ [${category}] FAIL: ${name} -> ${err.message} (Status: ${err.response?.status}, Data: ${JSON.stringify(err.response?.data)})`);
      results.push({ category, name, passed: false, error: err.message, status: err.response?.status, data: err.response?.data });
    }
  }

  // =========================================================================
  // ROUND 1: ENDPOINT CONTRACT TESTS
  // =========================================================================

  // 1. GET /api/health
  await executeTest('Round 1', 'GET /api/health returns healthy payload', async () => {
    const res = await axios.get(`${BASE_URL}/api/health`);
    if (res.status !== 200) throw new Error(`Status ${res.status}`);
    if (res.data.status !== 'healthy') throw new Error(`Unexpected status: ${res.data.status}`);
    if (res.data.totalCuratedSchemes !== 27) throw new Error(`Expected 27 schemes, found ${res.data.totalCuratedSchemes}`);
    if (typeof res.data.cacheStats !== 'object') throw new Error('Missing cache stats');
  });

  // 2. GET /api/schemes (without query params)
  await executeTest('Round 1', 'GET /api/schemes (no params) returns all 27 schemes', async () => {
    const res = await axios.get(`${BASE_URL}/api/schemes`);
    if (res.status !== 200) throw new Error(`Status ${res.status}`);
    if (!Array.isArray(res.data.schemes) || res.data.schemes.length !== 27) {
      throw new Error(`Expected 27 schemes, got ${res.data.schemes?.length}`);
    }
  });

  // 3. GET /api/schemes (search query param)
  await executeTest('Round 1', 'GET /api/schemes with search=mudra', async () => {
    const res = await axios.get(`${BASE_URL}/api/schemes?search=mudra`);
    if (res.status !== 200) throw new Error(`Status ${res.status}`);
    if (res.data.schemes.length === 0) throw new Error('No schemes found for search=mudra');
    const hasMudra = res.data.schemes.some(s => s.id === 'mudra-yojana');
    if (!hasMudra) throw new Error('Mudra Yojana not in search results');
  });

  // 4. GET /api/schemes (category query param)
  await executeTest('Round 1', 'GET /api/schemes with category=Street Vendors', async () => {
    const res = await axios.get(`${BASE_URL}/api/schemes?category=Street+Vendors`);
    if (res.status !== 200) throw new Error(`Status ${res.status}`);
    if (res.data.schemes.length === 0) throw new Error('No schemes found for Street Vendors');
    if (!res.data.schemes.some(s => s.id === 'pm-svanidhi')) throw new Error('PM SVANidhi missing');
  });

  // 5. GET /api/schemes (category=All)
  await executeTest('Round 1', 'GET /api/schemes with category=All returns all schemes', async () => {
    const res = await axios.get(`${BASE_URL}/api/schemes?category=All`);
    if (res.status !== 200) throw new Error(`Status ${res.status}`);
    if (res.data.schemes.length !== 27) throw new Error(`Expected 27 schemes, got ${res.data.schemes.length}`);
  });

  // 6. GET /api/schemes (ministry query param)
  await executeTest('Round 1', 'GET /api/schemes with ministry=Ministry of MSME', async () => {
    const res = await axios.get(`${BASE_URL}/api/schemes?ministry=Ministry+of+MSME`);
    if (res.status !== 200) throw new Error(`Status ${res.status}`);
    if (res.data.schemes.length === 0) throw new Error('No schemes found for MSME ministry');
  });

  // 7. GET /api/schemes/categories
  await executeTest('Round 1', 'GET /api/schemes/categories returns metadata lists', async () => {
    const res = await axios.get(`${BASE_URL}/api/schemes/categories`);
    if (res.status !== 200) throw new Error(`Status ${res.status}`);
    const { categories, ministries, businessTypes, socialCategories, genders } = res.data.data;
    if (!categories.length || !ministries.length || !businessTypes.length || !socialCategories.length || !genders.length) {
      throw new Error('Categories metadata payload incomplete');
    }
  });

  // 8. GET /api/schemes/:id (valid ID)
  await executeTest('Round 1', 'GET /api/schemes/:id (valid ID: pm-svanidhi)', async () => {
    const res = await axios.get(`${BASE_URL}/api/schemes/pm-svanidhi`);
    if (res.status !== 200) throw new Error(`Status ${res.status}`);
    if (res.data.data.id !== 'pm-svanidhi') throw new Error(`Unexpected scheme ID: ${res.data.data.id}`);
  });

  // 9. GET /api/schemes/:id (invalid ID 404 test)
  await executeTest('Round 1', 'GET /api/schemes/:id (invalid ID -> 404 test)', async () => {
    try {
      await axios.get(`${BASE_URL}/api/schemes/non-existent-scheme-9999`);
      throw new Error('Expected 404 error but request succeeded');
    } catch (err) {
      if (err.response?.status !== 404) throw err;
      if (err.response.data.error?.code !== 'NOT_FOUND') {
        throw new Error(`Expected error code NOT_FOUND, got ${err.response.data.error?.code}`);
      }
    }
  });

  // 10. POST /api/schemes/match (valid profile)
  await executeTest('Round 1', 'POST /api/schemes/match (valid street vendor profile)', async () => {
    const res = await axios.post(`${BASE_URL}/api/schemes/match`, {
      profile: {
        name: 'Ramesh Vendor',
        age: 38,
        gender: 'Male',
        category: 'OBC',
        businessType: 'street_vendor',
        annualIncome: 140000,
        existingBusiness: true
      }
    });
    if (res.status !== 200) throw new Error(`Status ${res.status}`);
    if (!res.data.matches || res.data.matches.length === 0) throw new Error('No matches returned');
    if (res.data.matches[0].scheme.id !== 'pm-svanidhi') {
      throw new Error(`Expected PM SVANidhi top match, got ${res.data.matches[0].scheme.id}`);
    }
    if (res.data.matches[0].matchScore < 80) {
      throw new Error(`Expected high score >= 80, got ${res.data.matches[0].matchScore}`);
    }
  });

  // 11. POST /api/schemes/match (partial profile)
  await executeTest('Round 1', 'POST /api/schemes/match (partial profile with only businessType)', async () => {
    const res = await axios.post(`${BASE_URL}/api/schemes/match`, {
      profile: { businessType: 'artisan' }
    });
    if (res.status !== 200) throw new Error(`Status ${res.status}`);
    if (res.data.matches[0].scheme.id !== 'pm-vishwakarma') {
      throw new Error(`Expected PM Vishwakarma top match, got ${res.data.matches[0].scheme.id}`);
    }
  });

  // 12. POST /api/schemes/match (edge case: 0 income)
  await executeTest('Round 1', 'POST /api/schemes/match (edge case: 0 income)', async () => {
    const res = await axios.post(`${BASE_URL}/api/schemes/match`, {
      profile: {
        businessType: 'street_vendor',
        annualIncome: 0,
        age: 30
      }
    });
    if (res.status !== 200) throw new Error(`Status ${res.status}`);
    const svanidhi = res.data.matches.find(m => m.scheme.id === 'pm-svanidhi');
    if (!svanidhi || svanidhi.matchScore < 80) {
      throw new Error(`0 income applicant should qualify for PM SVANidhi with high score, got ${svanidhi?.matchScore}`);
    }
  });

  // 13. POST /api/schemes/match (marginalized SC vs non-marginalized General)
  await executeTest('Round 1', 'POST /api/schemes/match (SC Woman vs General Male Stand-Up India check)', async () => {
    const resSC = await axios.post(`${BASE_URL}/api/schemes/match`, {
      profile: {
        businessType: 'manufacturing',
        gender: 'Female',
        category: 'SC',
        annualIncome: 100000
      }
    });
    const resGen = await axios.post(`${BASE_URL}/api/schemes/match`, {
      profile: {
        businessType: 'manufacturing',
        gender: 'Male',
        category: 'General',
        annualIncome: 100000
      }
    });
    const scStandUp = resSC.data.matches.find(m => m.scheme.id === 'stand-up-india');
    const genStandUp = resGen.data.matches.find(m => m.scheme.id === 'stand-up-india');

    if (!scStandUp || scStandUp.isDisqualified) {
      throw new Error('SC Woman must be eligible for Stand-Up India');
    }
    if (!genStandUp || !genStandUp.isDisqualified) {
      throw new Error('General Male must be strictly disqualified for Stand-Up India');
    }
    if (genStandUp.matchScore > 25) {
      throw new Error(`Disqualified scheme score should be capped at 25, got ${genStandUp.matchScore}`);
    }
  });

  // 14. GET /api/schemes/fetch-details (with url)
  await executeTest('Round 1', 'GET /api/schemes/fetch-details (with valid portal url)', async () => {
    const res = await axios.get(`${BASE_URL}/api/schemes/fetch-details?url=https://pmsvanidhi.mohua.gov.in/`);
    if (res.status !== 200) throw new Error(`Status ${res.status}`);
    if (!res.data.data?.content) throw new Error('Missing content in fetch details');
  });

  // 15. GET /api/schemes/fetch-details (without url, without schemeId -> 400)
  await executeTest('Round 1', 'GET /api/schemes/fetch-details (no params -> 400)', async () => {
    try {
      await axios.get(`${BASE_URL}/api/schemes/fetch-details`);
      throw new Error('Expected 400 error');
    } catch (err) {
      if (err.response?.status !== 400) throw err;
      if (err.response.data.error?.code !== 'BAD_REQUEST') {
        throw new Error(`Expected BAD_REQUEST code, got ${err.response.data.error?.code}`);
      }
    }
  });

  // 16. GET /api/schemes/fetch-details (with valid schemeId: pm-svanidhi)
  await executeTest('Round 1', 'GET /api/schemes/fetch-details (with schemeId: pm-svanidhi)', async () => {
    const res = await axios.get(`${BASE_URL}/api/schemes/fetch-details?schemeId=pm-svanidhi`);
    if (res.status !== 200) throw new Error(`Status ${res.status}`);
    if (!res.data.data?.title?.includes('SVANidhi')) {
      throw new Error(`Expected SVANidhi title, got ${res.data.data?.title}`);
    }
  });

  // 17. GET /api/schemes/fetch-details (with invalid schemeId -> 404)
  await executeTest('Round 1', 'GET /api/schemes/fetch-details (invalid schemeId -> 404)', async () => {
    try {
      await axios.get(`${BASE_URL}/api/schemes/fetch-details?schemeId=non-existent-xyz`);
      throw new Error('Expected 404 error');
    } catch (err) {
      if (err.response?.status !== 404) throw err;
      if (err.response.data.error?.code !== 'NOT_FOUND') {
        throw new Error(`Expected NOT_FOUND code, got ${err.response.data.error?.code}`);
      }
    }
  });

  // 18. POST /api/assistant/chat (English)
  await executeTest('Round 1', 'POST /api/assistant/chat (English language query)', async () => {
    const res = await axios.post(`${BASE_URL}/api/assistant/chat`, {
      message: 'Tell me about loans for street vendors',
      language: 'en'
    });
    if (res.status !== 200) throw new Error(`Status ${res.status}`);
    if (!res.data.response || res.data.language !== 'en') throw new Error('Invalid English response');
  });

  // 19. POST /api/assistant/chat (Hindi Devanagari)
  await executeTest('Round 1', 'POST /api/assistant/chat (Hindi Devanagari query)', async () => {
    const res = await axios.post(`${BASE_URL}/api/assistant/chat`, {
      message: 'मुझे दुकान खोलने के लिए लोन चाहिए',
      language: 'hi'
    });
    if (res.status !== 200) throw new Error(`Status ${res.status}`);
    if (res.data.language !== 'hi' || !res.data.response) throw new Error('Invalid Hindi response');
  });

  // 20. POST /api/assistant/chat (Hinglish)
  await executeTest('Round 1', 'POST /api/assistant/chat (Hinglish auto-detection)', async () => {
    const res = await axios.post(`${BASE_URL}/api/assistant/chat`, {
      message: 'Dukaan ke liye kitna loan milega?',
      language: 'en'
    });
    if (res.status !== 200) throw new Error(`Status ${res.status}`);
    if (res.data.language !== 'hi') throw new Error(`Expected Hinglish to detect as 'hi', got ${res.data.language}`);
  });

  // 21. POST /api/assistant/chat (Empty string -> 400)
  await executeTest('Round 1', 'POST /api/assistant/chat (Empty string message -> 400)', async () => {
    try {
      await axios.post(`${BASE_URL}/api/assistant/chat`, { message: '   ' });
      throw new Error('Expected 400 error');
    } catch (err) {
      if (err.response?.status !== 400) throw err;
    }
  });

  // 22. POST /api/assistant/chat (Gibberish)
  await executeTest('Round 1', 'POST /api/assistant/chat (Gibberish message)', async () => {
    const res = await axios.post(`${BASE_URL}/api/assistant/chat`, {
      message: 'aslkdjf98234 lkjasdflkj zxcvlkj',
      language: 'en'
    });
    if (res.status !== 200) throw new Error(`Status ${res.status}`);
    if (!res.data.response || !res.data.quickReplies?.length) throw new Error('Gibberish response missing fallback');
  });

  // 23. POST /api/assistant/chat (Long text 5000 chars)
  await executeTest('Round 1', 'POST /api/assistant/chat (Long text 5,000 characters)', async () => {
    const longMsg = 'I want to know about schemes for my business in India. '.repeat(100);
    const res = await axios.post(`${BASE_URL}/api/assistant/chat`, {
      message: longMsg,
      language: 'en'
    });
    if (res.status !== 200) throw new Error(`Status ${res.status}`);
    if (!res.data.response) throw new Error('Missing long text response');
  });

  // 24. POST /api/assistant/chat (targetScheme query with documents)
  await executeTest('Round 1', 'POST /api/assistant/chat (targetScheme document query)', async () => {
    const res = await axios.post(`${BASE_URL}/api/assistant/chat`, {
      message: 'What documents do I need for PM SVANidhi scheme?',
      language: 'en'
    });
    if (res.status !== 200) throw new Error(`Status ${res.status}`);
    if (!res.data.response.includes('PM SVANidhi')) {
      throw new Error('Did not identify and address PM SVANidhi documents specifically');
    }
  });

  // 25. POST /api/assistant/guide (valid scheme)
  await executeTest('Round 1', 'POST /api/assistant/guide (valid scheme: pm-svanidhi)', async () => {
    const res = await axios.post(`${BASE_URL}/api/assistant/guide`, {
      schemeId: 'pm-svanidhi',
      language: 'en'
    });
    if (res.status !== 200) throw new Error(`Status ${res.status}`);
    if (!res.data.data?.documentChecklist || !res.data.guidance?.scamWarning) {
      throw new Error('Guidance payload incomplete');
    }
  });

  // 26. POST /api/assistant/guide (invalid scheme -> 404)
  await executeTest('Round 1', 'POST /api/assistant/guide (invalid scheme -> 404)', async () => {
    try {
      await axios.post(`${BASE_URL}/api/assistant/guide`, {
        schemeId: 'fake-scheme-999',
        language: 'en'
      });
      throw new Error('Expected 404 error');
    } catch (err) {
      if (err.response?.status !== 404) throw err;
    }
  });

  // 27. Profile routes in /api/profile
  await executeTest('Round 1', 'Profile routes: GET /api/profile lists seeded profiles', async () => {
    const res = await axios.get(`${BASE_URL}/api/profile`);
    if (res.status !== 200) throw new Error(`Status ${res.status}`);
    if (!Array.isArray(res.data.profiles) || res.data.profiles.length < 4) {
      throw new Error(`Expected at least 4 demo profiles, found ${res.data.profiles?.length}`);
    }
  });

  let newProfileId = '';
  await executeTest('Round 1', 'Profile routes: POST /api/profile creates new profile', async () => {
    const res = await axios.post(`${BASE_URL}/api/profile`, {
      name: 'Auditor Demo Founder',
      age: 32,
      gender: 'Female',
      category: 'OBC',
      state: 'Punjab',
      businessType: 'food_processing',
      annualIncome: 150000
    });
    if (res.status !== 201) throw new Error(`Status ${res.status}`);
    if (!res.data.data?.id) throw new Error('Missing generated profile ID');
    newProfileId = res.data.data.id;
  });

  await executeTest('Round 1', 'Profile routes: POST /api/profile (missing name -> 400)', async () => {
    try {
      await axios.post(`${BASE_URL}/api/profile`, { age: 30 });
      throw new Error('Expected 400 error');
    } catch (err) {
      if (err.response?.status !== 400) throw err;
    }
  });

  await executeTest('Round 1', 'Profile routes: GET /api/profile/:id (valid ID)', async () => {
    const res = await axios.get(`${BASE_URL}/api/profile/${newProfileId}`);
    if (res.status !== 200) throw new Error(`Status ${res.status}`);
    if (res.data.data.name !== 'Auditor Demo Founder') throw new Error('Name mismatch');
  });

  await executeTest('Round 1', 'Profile routes: GET /api/profile/:id (invalid ID -> 404)', async () => {
    try {
      await axios.get(`${BASE_URL}/api/profile/unknown-id-8888`);
      throw new Error('Expected 404 error');
    } catch (err) {
      if (err.response?.status !== 404) throw err;
    }
  });

  await executeTest('Round 1', 'Profile routes: PUT /api/profile/:id (updates record)', async () => {
    const res = await axios.put(`${BASE_URL}/api/profile/${newProfileId}`, {
      annualIncome: 180000,
      district: 'Patiala'
    });
    if (res.status !== 200) throw new Error(`Status ${res.status}`);
    if (res.data.data.annualIncome !== 180000 || res.data.data.district !== 'Patiala') {
      throw new Error('Profile update was not reflected');
    }
  });

  await executeTest('Round 1', 'Profile routes: GET /api/profile/:id/matches (returns calculated schemes)', async () => {
    const res = await axios.get(`${BASE_URL}/api/profile/${newProfileId}/matches`);
    if (res.status !== 200) throw new Error(`Status ${res.status}`);
    if (!Array.isArray(res.data.matches) || res.data.matches.length === 0) {
      throw new Error('No matches found for saved profile');
    }
  });

  // =========================================================================
  // ROUND 2: STRESS-TESTING EDGE CASES & ERROR RESILIENCE
  // =========================================================================

  // 1. Array query params (e.g. ?search=a&search=b)
  await executeTest('Round 2', 'Stress: Array query params (?search=a&search=b) handles cleanly', async () => {
    const res = await axios.get(`${BASE_URL}/api/schemes?search=a&search=b`);
    if (res.status !== 200) throw new Error(`Status ${res.status}`);
  });

  // 2. Array query params for category and ministry
  await executeTest('Round 2', 'Stress: Array params for category & ministry (?category=a&category=b)', async () => {
    const res = await axios.get(`${BASE_URL}/api/schemes?category=Retail&category=Street&ministry=MSME&ministry=Finance`);
    if (res.status !== 200) throw new Error(`Status ${res.status}`);
  });

  // 3. Array query params for /schemes/search (?q=a&q=b)
  await executeTest('Round 2', 'Stress: Array params in live search (?q=pm&q=svanidhi)', async () => {
    const res = await axios.get(`${BASE_URL}/api/schemes/search?q=pm&q=svanidhi`);
    if (res.status !== 200) throw new Error(`Status ${res.status}`);
  });

  // 4. Malformed JSON syntax error in body -> 400
  await executeTest('Round 2', 'Stress: Malformed JSON payload syntax error -> returns 400 BAD_REQUEST', async () => {
    try {
      await axios.post(`${BASE_URL}/api/assistant/chat`, '{ "brokenJson": unquoted ', {
        headers: { 'Content-Type': 'application/json' }
      });
      throw new Error('Expected 400 error');
    } catch (err) {
      if (err.response?.status !== 400) throw err;
      if (err.response.data.error?.code !== 'INVALID_JSON') {
        throw new Error(`Expected error code INVALID_JSON, got ${err.response.data.error?.code}`);
      }
    }
  });

  // 5. Non-object body in POST /api/schemes/match -> 400
  await executeTest('Round 2', 'Stress: Non-object body (raw string) in POST /api/schemes/match -> 400', async () => {
    try {
      await axios.post(`${BASE_URL}/api/schemes/match`, '"raw string instead of json"', {
        headers: { 'Content-Type': 'application/json' }
      });
      throw new Error('Expected 400 error');
    } catch (err) {
      if (err.response?.status !== 400) throw err;
    }
  });

  // 6. Array body in POST /api/schemes/match -> 400
  await executeTest('Round 2', 'Stress: Array body [] in POST /api/schemes/match -> 400', async () => {
    try {
      await axios.post(`${BASE_URL}/api/schemes/match`, [], {
        headers: { 'Content-Type': 'application/json' }
      });
      throw new Error('Expected 400 error');
    } catch (err) {
      if (err.response?.status !== 400) throw err;
    }
  });

  // 7. Malformed profile fields (nested object businessType, array category, null income, negative age)
  await executeTest('Round 2', 'Stress: Object/Array fields in profile -> sanitized without 500 error', async () => {
    const res = await axios.post(`${BASE_URL}/api/schemes/match`, {
      profile: {
        businessType: { nested: 'object' },
        category: ['array', 'instead', 'of', 'string'],
        gender: 12345,
        age: -10,
        annualIncome: null,
        education: { invalid: true }
      }
    });
    if (res.status !== 200) throw new Error(`Status ${res.status}`);
    if (!res.data.matches || res.data.matches.length === 0) throw new Error('Matches failed');
  });

  // 8. 404 Route handling for non-existent endpoint
  await executeTest('Round 2', 'Stress: Undefined API route returns 404 with clean NOT_FOUND error', async () => {
    try {
      await axios.get(`${BASE_URL}/api/non-existent-endpoint-abc`);
      throw new Error('Expected 404 error');
    } catch (err) {
      if (err.response?.status !== 404) throw err;
      if (err.response.data.error?.code !== 'NOT_FOUND') {
        throw new Error(`Expected code NOT_FOUND, got ${err.response.data.error?.code}`);
      }
    }
  });

  // 9. TinyFish API Cache Verification
  await executeTest('Round 2', 'Stress: TinyFish API caching behavior (node-cache hit & speedup)', async () => {
    // 1st request
    const t1 = Date.now();
    const res1 = await axios.get(`${BASE_URL}/api/schemes/search?q=pmegp+subsidy`);
    const d1 = Date.now() - t1;

    // 2nd request (must hit node-cache)
    const t2 = Date.now();
    const res2 = await axios.get(`${BASE_URL}/api/schemes/search?q=pmegp+subsidy`);
    const d2 = Date.now() - t2;

    const health = await axios.get(`${BASE_URL}/api/health`);
    console.log(`      ⏱️  TinyFish Cache Metrics: 1st Call=${d1}ms, Cached 2nd Call=${d2}ms | Stats: hits=${health.data.cacheStats.hits}, keys=${health.data.cacheStats.keys}`);

    if (res2.data.liveSearch?.cached !== true && health.data.cacheStats.hits === 0) {
      throw new Error('TinyFish caching was not verified');
    }
  });

  console.log('===============================================================');
  const passed = results.filter(r => r.passed).length;
  const failed = results.filter(r => !r.passed).length;
  console.log(`   FINAL AUDIT SUMMARY: ${passed} PASSED, ${failed} FAILED (Total: ${results.length})`);
  console.log('===============================================================');

  return failed === 0;
}

runAudit()
  .then(success => process.exit(success ? 0 : 1))
  .catch(err => {
    console.error('Audit fatal error:', err);
    process.exit(1);
  });
