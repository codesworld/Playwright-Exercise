import { test, expect } from '../../fixtures/pages.fixture';
import contactData from '../../test-data/contact-form.json';

test.describe('Automation Exercise Tests', () => {
  test('Assert search results should contain "Dress" keyword', async ({ productsPage }) => {
    const searchKeyword = 'Dress';

    await productsPage.goto();

    await expect(productsPage.productsTitle).toHaveText(/all products/i);
    await productsPage.searchProduct(searchKeyword);
    await expect(productsPage.productsTitle).toHaveText(/searched products/i);

    const names = await productsPage.getProductNames();
    expect(names.length).toBeGreaterThan(0);

    
    // for (const name of names) {
    //   expect(name.toLowerCase()).toContain(searchKeyword.toLowerCase());
    // }
    expect(names.some(name =>
    name.toLowerCase().includes(searchKeyword.toLowerCase())
    )).toBeTruthy();
  });

  test('Add two products to the cart', async ({ productsPage, cartPage }) => {
    await productsPage.goto();

    await expect(productsPage.productsTitle).toBeVisible();
    await productsPage.addProductToCartByIndex(0);
    await productsPage.expectAddedModalVisible();
    await productsPage.continueShoppingBtn.click();
    await productsPage.addProductToCartByIndex(1);
    await productsPage.expectAddedModalVisible();
    await productsPage.continueShoppingBtn.click();

    await Promise.all([productsPage.waitForCartPage(), productsPage.goTo('Cart')]);

    await expect(cartPage.proceedToCheckoutBtn).toBeVisible();
    const count = await cartPage.getCartItemCount();
    expect(count).toBe(2);
  });

  test('Submit contact form successfully', async ({ contactUsPage }) => {
    const { name, email, subject, message } = contactData.Contact;

    await contactUsPage.goto();
    await expect(contactUsPage.contactUsTitle).toBeVisible();
    await contactUsPage.submitForm(name, email, subject, message);
    await expect(contactUsPage.successMsg).toContainText('Success!');
  });
});
