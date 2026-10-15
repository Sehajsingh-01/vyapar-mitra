import { chromium } from 'playwright-core';
import path from 'path';

const ARTIFACT_DIR = 'C:/Users/Sehaj/.gemini/antigravity/brain/f2909268-68d6-4a75-9a4c-e403bbf2fa5c';
const EDGE_PATH = 'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe';

async function verifyNavbar() {
  const browser = await chromium.launch({
    executablePath: EDGE_PATH,
    headless: true
  });

  // Test at 1440px (common laptop/desktop)
  const page1440 = await browser.newPage({
    viewport: { width: 1440, height: 400 }
  });
  await page1440.goto('http://localhost:5000/', { waitUntil: 'networkidle' });
  await page1440.waitForTimeout(1000);
  const snap1440 = path.join(ARTIFACT_DIR, 'verified-navbar-1440.png');
  await page1440.screenshot({ path: snap1440, clip: { x: 0, y: 0, width: 1440, height: 120 } });
  console.log('CAPTURED 1440:', snap1440);

  // Test at 1280px
  const page1280 = await browser.newPage({
    viewport: { width: 1280, height: 400 }
  });
  await page1280.goto('http://localhost:5000/', { waitUntil: 'networkidle' });
  await page1280.waitForTimeout(1000);
  const snap1280 = path.join(ARTIFACT_DIR, 'verified-navbar-1280.png');
  await page1280.screenshot({ path: snap1280, clip: { x: 0, y: 0, width: 1280, height: 120 } });
  console.log('CAPTURED 1280:', snap1280);

  await browser.close();
}

verifyNavbar().catch(console.error);
