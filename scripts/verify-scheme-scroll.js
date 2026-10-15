import { chromium } from 'playwright-core';
import path from 'path';

const ARTIFACT_DIR = 'C:/Users/Sehaj/.gemini/antigravity/brain/f2909268-68d6-4a75-9a4c-e403bbf2fa5c';
const EDGE_PATH = 'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe';

async function captureScrolledScheme() {
  const browser = await chromium.launch({
    executablePath: EDGE_PATH,
    headless: true
  });

  const page = await browser.newPage({
    viewport: { width: 1280, height: 1200 }
  });

  await page.goto('http://localhost:5000/schemes/pmegp', { waitUntil: 'networkidle' });
  await page.waitForTimeout(1000);

  // Click Fetch Live Updates
  const fetchBtn = page.getByRole('button', { name: /Fetch Live Updates/i }).first();
  await fetchBtn.click();
  await page.waitForTimeout(2000);

  // Scroll to Live bulletin & Eligibility Criteria section
  await page.evaluate(() => {
    window.scrollBy(0, 500);
  });
  await page.waitForTimeout(1000);

  const fullPath = path.join(ARTIFACT_DIR, 'verified-eligibility-and-live-bulletin.png');
  await page.screenshot({ path: fullPath, fullPage: false });
  console.log('CAPTURED SCROLLED VIEW:', fullPath);

  // Also take full page screenshot
  const fullPagePath = path.join(ARTIFACT_DIR, 'verified-scheme-detail-fullpage.png');
  await page.screenshot({ path: fullPagePath, fullPage: true });
  console.log('CAPTURED FULL PAGE:', fullPagePath);

  await browser.close();
}

captureScrolledScheme().catch(console.error);
