import { test as base, Page } from '@playwright/test';
import { ProductsPage } from '../pages/ProductsPage';
import { CartPage } from '../pages/CartPage';
import { ContactUsPage } from '../pages/ContactUsPage';

type Pages = {
  productsPage: ProductsPage;
  cartPage: CartPage;
  contactUsPage: ContactUsPage;
};

export const test = base.extend<Pages>({
  productsPage: async ({ page }: { page: Page }, use) => {
    await use(new ProductsPage(page));
  },
  cartPage: async ({ page }: { page: Page }, use) => {
    await use(new CartPage(page));
  },
  contactUsPage: async ({ page }: { page: Page }, use) => {
    await use(new ContactUsPage(page));
  },
});

