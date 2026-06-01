import { test as setup, expect } from '@playwright/test';
import { SignupLoginPage } from '../../pages/SignupLoginPage';

const authFile = 'auth/auth-state.json';

setup('authenticate user and save auth state', async ({ page }) => {
  const email = process.env.USER_EMAIL;
  const password = process.env.USER_PASSWORD;

  if (!email || !password) {
    throw new Error('USER_EMAIL or USER_PASSWORD is missing in .env');
  }

  await page.goto('/');

  const consentButton = page.getByRole('button', { name: 'Consent' });

  if (await consentButton.isVisible({ timeout: 5000 }).catch(() => false)) {
    await consentButton.click();
  }

  const loginPage = new SignupLoginPage(page);

  await loginPage.goto();

  const consentButtonOnLogin = page.getByRole('button', { name: 'Consent' });

  if (await consentButtonOnLogin.isVisible({ timeout: 5000 }).catch(() => false)) {
    await consentButtonOnLogin.click();
  }

  await loginPage.expectLoginFormVisible();
  await loginPage.login(email, password);

  await expect(page.locator('a[href="/logout"]')).toBeVisible();

  await page.context().storageState({ path: authFile });
});