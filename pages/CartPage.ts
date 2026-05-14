import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';

export class CartPage extends BasePage {
  readonly cartItems: Locator;
  readonly cartProductNames: Locator;
  readonly proceedToCheckoutBtn: Locator;
  readonly removeItemBtn: Locator;
  readonly quantityValue: Locator;

  constructor(page: Page) {
    super(page);
    this.cartItems = page.locator('#cart_info_table tbody tr');
    this.cartProductNames = page.locator('#cart_info_table .cart_description h4 a');
    this.proceedToCheckoutBtn = page.locator('a:has-text("Proceed To Checkout")');
    this.removeItemBtn = page.locator('#cart_info_table .cart_quantity_delete');
    this.quantityValue = page.locator('#cart_info_table .cart_quantity button');
  }

  async goto() {
    await this.navigateTo('/view_cart');
  }
  async getCartItemCount(): Promise<number> {
    return this.cartItems.count();
  }
  async getCartProductNames(): Promise<string[]> {
    return this.cartProductNames.allInnerTexts();
  }
  async removeItem(index: number): Promise<void> {
     await this.removeItemBtn.nth(index).click();
  }
}