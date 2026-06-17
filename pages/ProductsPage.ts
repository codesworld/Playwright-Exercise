import { Page, expect, Locator } from '@playwright/test';
import { BasePage } from './BasePage';

export class ProductsPage extends BasePage {
  readonly searchInput: Locator;
  readonly searchBtn: Locator;
  readonly productList: Locator;
  readonly productName: Locator;
  readonly productPrice: Locator;
  readonly continueShoppingBtn: Locator;
  readonly viewProductBtn: Locator;
  readonly viewCartLink: Locator;
  readonly productsTitle: Locator;
  readonly addedModalTitle: Locator;
  readonly addedSuccessMsg: Locator;
  readonly cartModal: Locator;

  constructor(page: Page) {
    super(page);

    this.searchInput = page.locator('#search_product');
    this.searchBtn = page.locator('#submit_search');
    this.productList = page.locator('.features_items .col-sm-4');
    this.productName = page.locator('.productinfo p');
    this.productPrice = page.locator('.productinfo h2');
    this.cartModal = page.locator('#cartModal');
    this.continueShoppingBtn = this.cartModal.getByRole('button', {
      name: 'Continue Shopping',
    });
    this.viewProductBtn = page.locator('a:has-text("View Product")');
    this.viewCartLink = this.cartModal.getByRole('link', {
      name: 'View Cart',
    });
    this.productsTitle = page.locator('.features_items h2.title');
    this.addedModalTitle = this.cartModal.locator('.modal-title');
    this.addedSuccessMsg = this.cartModal
      .locator('.modal-body p')
      .filter({ hasText: 'Your product has been added to cart.' });
  }
  async goto(): Promise<void> {
    await this.navigateTo('/products');
  }
  async searchProduct(keyword: string): Promise<void> {
    await this.searchInput.fill(keyword);
    await this.searchBtn.click();
    await this.productList.first().waitFor({ state: 'visible' });
  }
  async getProductCount(): Promise<number> {
    return await this.productList.count();
  }
  async getProductNames(): Promise<string[]> {
    return await this.productName.allInnerTexts();
  }
  async getProductPrices(): Promise<string[]> {
    return await this.productPrice.allInnerTexts();
  }
  async addProductToCartByIndex(index: number): Promise<void> {
    const count = await this.productList.count();
    if (index >= count) throw new Error(`Index ${index} out of bounds. Total products: ${count}`);
    const product = this.productList.nth(index);
    await product.hover();
    await product.locator('.product-overlay .add-to-cart').click();
  }
  async viewProductByIndex(index: number): Promise<void> {
    const product = this.productList.nth(index);
    await product.hover();
    await product.locator('a:has-text("View Product")').click();
  }
  async expectAddedModalVisible(): Promise<void> {
    await expect(this.addedModalTitle).toHaveText(/added!/i);
    await expect(this.addedSuccessMsg).toBeVisible();
    await expect(this.viewCartLink).toBeVisible();
  }
  async waitForCartPage(): Promise<void> {
    await this.page.waitForURL('**/view_cart');
  }
}
