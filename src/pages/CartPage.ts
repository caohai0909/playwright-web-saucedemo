import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';

export class CartPage extends BasePage {
  // Locators
  private readonly pageTitle: Locator;
  private readonly cartItems: Locator;
  private readonly continueShoppingButton: Locator;
  private readonly checkoutButton: Locator;
  private readonly removeButtons: Locator;

  constructor(page: Page) {
    super(page);
    this.pageTitle = page.locator('.title');
    this.cartItems = page.locator('.cart_item');
    this.continueShoppingButton = page.locator('[data-test="continue-shopping"]');
    this.checkoutButton = page.locator('[data-test="checkout"]');
    this.removeButtons = page.locator('button[class*="cart_button"]');
  }

  async getCartItemsCount(): Promise<number> {
    return await this.cartItems.count();
  }

  async getCartItemNames(): Promise<string[]> {
    return await this.page.locator('.inventory_item_name').allTextContents();
  }

  async removeItemByName(productName: string) {
    const item = this.page.locator('.cart_item', { hasText: productName });
    await item.locator('button').click();
  }

  async continueShopping() {
    await this.continueShoppingButton.click();
  }

  async proceedToCheckout() {
    await this.checkoutButton.click();
  }

  async getPageTitle(): Promise<string | null> {
    return await this.pageTitle.textContent();
  }

  async isCartEmpty(): Promise<boolean> {
    return (await this.getCartItemsCount()) === 0;
  }
}