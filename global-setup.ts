import { chromium } from '@playwright/test';

async function globalSetup() {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  
 await page.goto(process.env.BASE_URL!, { waitUntil: 'domcontentloaded' });
  const consentBtn = page.locator('button[aria-label="Consent"]');

  if (await consentBtn.isVisible()) {
  await consentBtn.click();
  await consentBtn.waitFor({ state: 'hidden' });
  }
  
  await page.context().storageState({ path: 'auth/cookie-state.json' });
  await browser.close();
}

export default globalSetup;