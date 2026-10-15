import { chromium } from 'playwright-core';
import path from 'path';

const ARTIFACT_DIR = 'C:/Users/Sehaj/.gemini/antigravity/brain/f2909268-68d6-4a75-9a4c-e403bbf2fa5c';
const EDGE_PATH = 'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe';

async function testNavbarWidths() {
  const browser = await chromium.launch({
    executablePath: EDGE_PATH,
    headless: true
  });

  for (const w of [1280, 1440, 1600]) {
    const page = await browser.newPage({ viewport: { width: w, height: 400 } });
    await page.goto('http://localhost:5000/', { waitUntil: 'networkidle' });
    await page.waitForTimeout(500);

    const snap = path.join(ARTIFACT_DIR, `centered-navbar-${w}.png`);
    await page.screenshot({ path: snap, clip: { x: 0, y: 0, width: w, height: 110 } });
    console.log(`Saved screenshot for ${w}px:`, snap);
    await page.close();
  }

  await browser.close();
}

testNavbarWidths().catch(console.error);
