import { chromium } from 'playwright-core';
import path from 'path';

const ARTIFACT_DIR = 'C:/Users/Sehaj/.gemini/antigravity/brain/f2909268-68d6-4a75-9a4c-e403bbf2fa5c';
const EDGE_PATH = 'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe';

async function verifyFluidAnimation() {
  const browser = await chromium.launch({
    executablePath: EDGE_PATH,
    headless: true
  });

  const page = await browser.newPage({
    viewport: { width: 1440, height: 400 }
  });

  await page.goto('http://localhost:5000/', { waitUntil: 'networkidle' });
  await page.waitForTimeout(1000);

  // 1. Initial on Home
  const homeSnap = path.join(ARTIFACT_DIR, 'fluid-nav-home.png');
  await page.screenshot({ path: homeSnap, clip: { x: 0, y: 0, width: 1440, height: 110 } });
  console.log('Captured Home:', homeSnap);

  // 2. Click Calculator tab
  console.log('Clicking Calculator tab...');
  const calcLink = page.getByRole('link', { name: /Calculator/i }).first();
  await calcLink.click();
  await page.waitForTimeout(600); // Allow spring animation to glide

  const calcSnap = path.join(ARTIFACT_DIR, 'fluid-nav-calculator.png');
  await page.screenshot({ path: calcSnap, clip: { x: 0, y: 0, width: 1440, height: 110 } });
  console.log('Captured Calculator:', calcSnap);

  // 3. Click Doc Readiness tab
  console.log('Clicking Doc Readiness tab...');
  const docLink = page.getByRole('link', { name: /Doc Readiness/i }).first();
  await docLink.click();
  await page.waitForTimeout(600);

  const docSnap = path.join(ARTIFACT_DIR, 'fluid-nav-readiness.png');
  await page.screenshot({ path: docSnap, clip: { x: 0, y: 0, width: 1440, height: 110 } });
  console.log('Captured Doc Readiness:', docSnap);

  // 4. Click AI Assistant tab
  console.log('Clicking AI Assistant tab...');
  const aiLink = page.getByRole('link', { name: /AI Assistant/i }).first();
  await aiLink.click();
  await page.waitForTimeout(600);

  const aiSnap = path.join(ARTIFACT_DIR, 'fluid-nav-assistant.png');
  await page.screenshot({ path: aiSnap, clip: { x: 0, y: 0, width: 1440, height: 110 } });
  console.log('Captured AI Assistant:', aiSnap);

  await browser.close();
  console.log('FLUID NAVIGATION VERIFICATION COMPLETED!');
}

verifyFluidAnimation().catch(console.error);
