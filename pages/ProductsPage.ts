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
  readonly viewCartLink : Locator;

  constructor(page: Page) {
    super(page);

    this.searchInput = page.locator('#search_product');
    this.searchBtn = page.locator('#submit_search');
    this.productList = page.locator('.features_items .col-sm-4');
    this.productName = page.locator('.productinfo p');
    this.productPrice = page.locator('.productinfo h2');
    this.continueShoppingBtn = page.locator(
      'button:has-text("Continue Shopping")'
    );
    this.viewProductBtn = page.locator('a:has-text("View Product")');
    this.viewCartLink = page.locator('#cartModal a:has-text("View Cart")');
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
    return (await this.productList.count());
  }
  async getProductNames(): Promise<string[]> {
    return (await this.productName.allInnerTexts());
  }
  async getProductPrices(): Promise<string[]> {
    return (await this.productPrice.allInnerTexts());
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
}
