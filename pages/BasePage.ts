import { Page, Locator, expect } from '@playwright/test';
type NavLink = 'Products' | 'Cart' | 'Login' |'Home';

const NAV_ROUTES: Record<NavLink, string> = {
  Home:     '/',
  Products: '/products',
  Cart:     '/view_cart',
  Login:    '/login',
};
export abstract class BasePage {
  protected readonly page: Page;
   
  constructor(page: Page) {
    this.page = page;
  }

  async goTo(link: NavLink): Promise<void> {
    await this.page.locator(`#header a[href="${NAV_ROUTES[link]}"]`).click();
  }
  async navigateTo(path = '/'): Promise<void> {
    await this.page.goto(path);
    await this.page.waitForLoadState('domcontentloaded');
  }
  async getTitle(): Promise<string> {
    return this.page.title();
  }
}