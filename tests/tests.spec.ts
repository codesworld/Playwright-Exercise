import { test } from '../fixtures/pages.fixture';
import { expect } from '@playwright/test';
import contactData from '../test-data/contact-form.json';

test.describe('Automation Exercise Tests', () => {

    test('Assert search results should contain "Dress" keyword', async ({ productsPage }) => {
        await productsPage.goto();
        await productsPage.searchProduct('Dress');

        const names = await productsPage.getProductNames();
        expect(names.length).toBeGreaterThan(0);
       
        /* Note: Not all results contain "Dress" in their name.
          The site appears to match by category, not just product name.
          This is considered a bug — search should return name-matched results only.
          See README for details.*/
        for (const name of names) {
         expect(name.toLowerCase()).toContain('dress');
        }
    });

    test('Add two products to the cart', async ({ productsPage, cartPage }) => {
        await productsPage.goto();
        await productsPage.addProductToCartByIndex(0);
        await productsPage.continueShoppingBtn.click();
        await productsPage.addProductToCartByIndex(1);
        await productsPage.viewCartLink.click();

        const count = await cartPage.getCartItemCount();
        expect(count).toBe(2);
    });

    test('Submit contact form successfully', async ({ contactUsPage }) => {
        const { name, email, subject, message } = contactData.Contact;

        await contactUsPage.goto();
        await contactUsPage.submitForm(name, email, subject, message);
        await expect(contactUsPage.successMsg).toBeVisible();
        await expect(contactUsPage.successMsg).toContainText('Success!');
    })
});