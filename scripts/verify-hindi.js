import { chromium } from 'playwright-core';
import path from 'path';

const ARTIFACT_DIR = 'C:/Users/Sehaj/.gemini/antigravity/brain/f2909268-68d6-4a75-9a4c-e403bbf2fa5c';
const EDGE_PATH = 'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe';

async function testHindiMode() {
  const browser = await chromium.launch({
    executablePath: EDGE_PATH,
    headless: true
  });

  const page = await browser.newPage({
    viewport: { width: 1280, height: 1100 }
  });

  await page.goto('http://localhost:5000/schemes/pmegp', { waitUntil: 'networkidle' });
  await page.waitForTimeout(1000);

  // Click Hindi language button
  const langBtn = page.getByRole('button', { name: /हिन्दी/i }).first();
  if (await langBtn.isVisible()) {
    await langBtn.click();
    await page.waitForTimeout(1500);
  }

  // Click Fetch Live Updates
  const fetchBtn = page.getByRole('button', { name: /लाइव अपडेट|Fetch Live/i }).first();
  if (await fetchBtn.isVisible()) {
    await fetchBtn.click();
    await page.waitForTimeout(2000);
  }

  await page.evaluate(() => window.scrollBy(0, 450));
  await page.waitForTimeout(1000);

  const hindiPath = path.join(ARTIFACT_DIR, 'verified-hindi-scheme-detail.png');
  await page.screenshot({ path: hindiPath });
  console.log('CAPTURED HINDI VIEW:', hindiPath);

  await browser.close();
}

testHindiMode().catch(console.error);
