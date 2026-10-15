import axios from 'axios';
import { spawn } from 'child_process';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const BASE_URL = 'http://localhost:5000';

async function wait(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function runTests() {
  console.log('--- STARTING VYAPAR MITRA BACKEND INTEGRATION TESTS ---');
  let passed = 0;
  let failed = 0;

  function assert(condition, testName) {
    if (condition) {
      console.log(`✅ PASS: ${testName}`);
      passed++;
    } else {
      console.error(`❌ FAIL: ${testName}`);
      failed++;
    }
  }

  // 1. Health check
  try {
    const res = await axios.get(`${BASE_URL}/api/health`);
    assert(res.status === 200 && res.data.status === 'healthy', 'GET /api/health returns healthy');
    assert(res.data.totalCuratedSchemes >= 20, `Total curated schemes is >= 20 (found ${res.data.totalCuratedSchemes})`);
  } catch (err) {
    assert(false, `GET /api/health: ${err.message}`);
  }

  // 2. Schemes listing
  try {
    const res = await axios.get(`${BASE_URL}/api/schemes`);
    assert(res.status === 200 && res.data.schemes.length >= 20, `GET /api/schemes returns all ${res.data.schemes?.length} schemes`);
  } catch (err) {
    assert(false, `GET /api/schemes: ${err.message}`);
  }

  // 3. Scheme categories metadata
  try {
    const res = await axios.get(`${BASE_URL}/api/schemes/categories`);
    assert(res.status === 200 && res.data.data.categories.length > 5, 'GET /api/schemes/categories returns metadata');
  } catch (err) {
    assert(false, `GET /api/schemes/categories: ${err.message}`);
  }

  // 4. Single scheme by ID
  try {
    const res = await axios.get(`${BASE_URL}/api/schemes/pm-svanidhi`);
    assert(res.status === 200 && res.data.data.id === 'pm-svanidhi', 'GET /api/schemes/pm-svanidhi returns PM SVANidhi');
  } catch (err) {
    assert(false, `GET /api/schemes/pm-svanidhi: ${err.message}`);
  }

  // 5. Scheme matching: Street vendor profile
  try {
    const vendorProfile = {
      name: 'Ramesh Vendor',
      age: 35,
      gender: 'Male',
      category: 'OBC',
      state: 'Delhi',
      businessType: 'street_vendor',
      annualIncome: 120000,
      existingBusiness: true,
      education: 'none'
    };
    const res = await axios.post(`${BASE_URL}/api/schemes/match`, { profile: vendorProfile });
    assert(res.status === 200, 'POST /api/schemes/match responds 200');
    assert(res.data.matches[0].scheme.id === 'pm-svanidhi', `Top match for street vendor is PM SVANidhi (got ${res.data.matches[0]?.scheme?.id})`);
    assert(res.data.matches[0].matchScore >= 80, `Street vendor match score >= 80 (got ${res.data.matches[0]?.matchScore})`);
  } catch (err) {
    assert(false, `POST /api/schemes/match (Vendor): ${err.message}`);
  }

  // 6. Scheme matching: Traditional artisan
  try {
    const artisanProfile = {
      name: 'Gopal Carpenter',
      age: 42,
      gender: 'Male',
      category: 'OBC',
      state: 'Rajasthan',
      businessType: 'artisan',
      annualIncome: 150000,
      existingBusiness: true,
      education: '8th_pass'
    };
    const res = await axios.post(`${BASE_URL}/api/schemes/match`, { profile: artisanProfile });
    assert(res.data.matches[0].scheme.id === 'pm-vishwakarma', `Top match for artisan is PM Vishwakarma (got ${res.data.matches[0]?.scheme?.id})`);
  } catch (err) {
    assert(false, `POST /api/schemes/match (Artisan): ${err.message}`);
  }

  // 7. Scheme matching: SC/ST woman entrepreneur greenfield
  try {
    const womanProfile = {
      name: 'Meena Kumari',
      age: 29,
      gender: 'Female',
      category: 'SC',
      state: 'Maharashtra',
      businessType: 'manufacturing',
      annualIncome: 250000,
      existingBusiness: false, // greenfield
      education: 'graduate'
    };
    const res = await axios.post(`${BASE_URL}/api/schemes/match`, { profile: womanProfile });
    const topSchemes = res.data.matches.slice(0, 3).map(m => m.scheme.id);
    assert(topSchemes.includes('stand-up-india') || topSchemes.includes('pmegp'), `Top matches for SC woman includes Stand-Up India or PMEGP (got ${topSchemes.join(', ')})`);
  } catch (err) {
    assert(false, `POST /api/schemes/match (SC Woman): ${err.message}`);
  }

  // 8. TinyFish Search
  try {
    const res = await axios.get(`${BASE_URL}/api/schemes/search?q=pm+svanidhi`);
    assert(res.status === 200, 'GET /api/schemes/search responds 200');
    assert(res.data.liveSearch.results.length > 0 || res.data.curatedMatches > 0, 'TinyFish search returns results');
  } catch (err) {
    assert(false, `GET /api/schemes/search: ${err.message}`);
  }

  // 9. TinyFish Fetch
  try {
    const res = await axios.get(`${BASE_URL}/api/schemes/fetch-details?url=https://en.wikipedia.org/wiki/Pradhan_Mantri_Mudra_Yojana`);
    assert(res.status === 200 && res.data.data.content, 'GET /api/schemes/fetch-details extracts markdown');
  } catch (err) {
    assert(false, `GET /api/schemes/fetch-details: ${err.message}`);
  }

  // 10. Profile management
  try {
    const createRes = await axios.post(`${BASE_URL}/api/profile`, {
      name: 'Laxmi Devi',
      age: 34,
      gender: 'Female',
      category: 'OBC',
      state: 'Bihar',
      businessType: 'food_processing',
      annualIncome: 110000,
      existingBusiness: true,
      education: 'primary'
    });
    assert(createRes.status === 201 && createRes.data.data.id, 'POST /api/profile creates new profile');
    const newId = createRes.data.data.id;

    const getRes = await axios.get(`${BASE_URL}/api/profile/${newId}`);
    assert(getRes.status === 200 && getRes.data.data.name === 'Laxmi Devi', 'GET /api/profile/:id fetches profile');

    const matchRes = await axios.get(`${BASE_URL}/api/profile/${newId}/matches`);
    assert(matchRes.status === 200 && matchRes.data.matches.length > 0, 'GET /api/profile/:id/matches returns matches');
  } catch (err) {
    assert(false, `Profile CRUD: ${err.message}`);
  }

  // 11. AI Assistant Chat (English)
  try {
    const res = await axios.post(`${BASE_URL}/api/assistant/chat`, {
      message: 'What documents do I need for PM SVANidhi scheme?',
      language: 'en'
    });
    assert(res.status === 200 && res.data.response.includes('PM SVANidhi'), 'POST /api/assistant/chat answers document query in English');
    assert(res.data.quickReplies.length > 0, 'AI assistant returns quick reply options');
  } catch (err) {
    assert(false, `Assistant Chat (EN): ${err.message}`);
  }

  // 12. AI Assistant Chat (Hindi)
  try {
    const res = await axios.post(`${BASE_URL}/api/assistant/chat`, {
      message: 'विश्वकर्मा योजना में आवेदन कैसे करें?',
      language: 'hi'
    });
    assert(res.status === 200 && res.data.language === 'hi', 'POST /api/assistant/chat answers in Hindi');
    assert(res.data.response.includes('विश्वकर्मा'), 'Hindi response includes Vishwakarma');
  } catch (err) {
    assert(false, `Assistant Chat (HI): ${err.message}`);
  }

  // 13. AI Assistant Guide
  try {
    const res = await axios.post(`${BASE_URL}/api/assistant/guide`, {
      schemeId: 'pm-svanidhi',
      language: 'en'
    });
    assert(res.status === 200 && res.data.guidance.documentChecklist.length > 0, 'POST /api/assistant/guide returns step-by-step guidance');
    assert(res.data.guidance.scamWarning.includes('Caution'), 'Guidance includes anti-scam warning');
  } catch (err) {
    assert(false, `Assistant Guide: ${err.message}`);
  }

  console.log(`\n=================================================`);
  console.log(`TEST SUMMARY: ${passed} PASSED, ${failed} FAILED`);
  console.log(`=================================================`);

  return failed === 0;
}

// Run test script against running server or launch temp server
async function main() {
  console.log('Checking if server is running...');
  let serverProcess = null;

  try {
    await axios.get(`${BASE_URL}/api/health`, { timeout: 2000 });
    console.log('Server is already running on port 5000.');
  } catch {
    console.log('Starting server in background for testing...');
    serverProcess = spawn('node', ['server/index.js'], {
      cwd: path.resolve(__dirname),
      stdio: 'inherit'
    });
    await wait(3000);
  }

  const success = await runTests();

  if (serverProcess) {
    console.log('Stopping test server process...');
    serverProcess.kill('SIGINT');
  }

  process.exit(success ? 0 : 1);
}

main().catch(err => {
  console.error('Fatal test error:', err);
  process.exit(1);
});
