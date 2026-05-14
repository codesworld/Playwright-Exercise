import { chromium } from '@playwright/test';
import * as dotenv from 'dotenv';
dotenv.config();

async function globalSetup() {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  
  await page.goto(process.env.BASE_URL!, { waitUntil: 'networkidle' });
  
  const consentBtn = page.locator('button[aria-label="Consent"]');

  await consentBtn.waitFor({ state: 'visible', timeout: 15000 });
    await consentBtn.click();
    //await page.waitForTimeout(2000);
    await consentBtn.waitFor({ state: 'hidden' });
  
  await page.context().storageState({ path: 'auth/cookie-state.json' });
  await browser.close();
}

export default globalSetup;