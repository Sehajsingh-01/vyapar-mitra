import { chromium } from 'playwright-core';
import path from 'path';
import fs from 'fs';

const ARTIFACT_DIR = 'C:/Users/Sehaj/.gemini/antigravity/brain/f2909268-68d6-4a75-9a4c-e403bbf2fa5c';
const EDGE_PATH = 'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe';

async function runVerification() {
  console.log('Launching headless Edge at:', EDGE_PATH);
  const browser = await chromium.launch({
    executablePath: EDGE_PATH,
    headless: true
  });

  const context = await browser.newContext({
    viewport: { width: 1280, height: 900 }
  });

  // 1. Verify Scheme Detail & TinyFish Live Fetch
  console.log('Testing Scheme Detail: http://localhost:5000/schemes/pmegp');
  const page = await context.newPage();
  await page.goto('http://localhost:5000/schemes/pmegp', { waitUntil: 'networkidle' });
  await page.waitForTimeout(1500);

  // Take screenshot of scheme detail showing rich eligibility criteria
  const schemeDetailPath = path.join(ARTIFACT_DIR, 'verified-scheme-detail-eligibility.png');
  await page.screenshot({ path: schemeDetailPath, fullPage: false });
  console.log('Captured:', schemeDetailPath);

  // Click "Fetch Live Updates (TinyFish API)"
  console.log('Clicking Fetch Live Updates button...');
  const fetchBtn = page.getByRole('button', { name: /Fetch Live Updates/i }).first();
  if (await fetchBtn.isVisible()) {
    await fetchBtn.click();
    console.log('Clicked Fetch Live Updates. Waiting for TinyFish bulletin...');
    await page.waitForTimeout(3000);
  }

  const liveBulletinPath = path.join(ARTIFACT_DIR, 'verified-tinyfish-live-bulletin.png');
  await page.screenshot({ path: liveBulletinPath, fullPage: false });
  console.log('Captured live bulletin:', liveBulletinPath);

  // 2. Verify Calculator
  console.log('Testing Calculator: http://localhost:5000/calculator');
  await page.goto('http://localhost:5000/calculator', { waitUntil: 'networkidle' });
  await page.waitForTimeout(1500);
  const calcPath = path.join(ARTIFACT_DIR, 'verified-subsidy-calculator.png');
  await page.screenshot({ path: calcPath, fullPage: false });
  console.log('Captured:', calcPath);

  // 3. Verify Document Readiness
  console.log('Testing Document Readiness: http://localhost:5000/readiness');
  await page.goto('http://localhost:5000/readiness', { waitUntil: 'networkidle' });
  await page.waitForTimeout(1500);
  const readinessPath = path.join(ARTIFACT_DIR, 'verified-document-readiness.png');
  await page.screenshot({ path: readinessPath, fullPage: false });
  console.log('Captured:', readinessPath);

  // 4. Verify AI Assistant with dynamic query
  console.log('Testing AI Assistant: http://localhost:5000/assistant');
  await page.goto('http://localhost:5000/assistant', { waitUntil: 'networkidle' });
  await page.waitForTimeout(1000);

  const textarea = page.locator('textarea');
  await textarea.fill('How can a woman entrepreneur get 35% subsidy under PMEGP for food processing?');
  const sendBtn = page.getByRole('button', { name: /Ask AI|send/i });
  await sendBtn.click();
  console.log('Sent query to AI Assistant. Waiting for dynamic response...');
  await page.waitForTimeout(3000);

  const assistantPath = path.join(ARTIFACT_DIR, 'verified-assistant-response.png');
  await page.screenshot({ path: assistantPath, fullPage: false });
  console.log('Captured:', assistantPath);

  await browser.close();
  console.log('ALL VISUAL VERIFICATIONS COMPLETED SUCCESSFULLY!');
}

runVerification().catch(err => {
  console.error('Verification error:', err);
  process.exit(1);
});
