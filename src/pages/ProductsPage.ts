import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';

export class ProductsPage extends BasePage {
  // Locators
  private readonly pageTitle: Locator;
  private readonly inventoryItems: Locator;
  private readonly shoppingCartBadge: Locator;
  private readonly shoppingCartLink: Locator;
  private readonly burgerMenuButton: Locator;
  private readonly logoutLink: Locator;
  private readonly productSortDropdown: Locator;

  constructor(page: Page) {
    super(page);
    this.pageTitle = page.locator('.title');
    this.inventoryItems = page.locator('.inventory_item');
    this.shoppingCartBadge = page.locator('.shopping_cart_badge');
    this.shoppingCartLink = page.locator('.shopping_cart_link');
    this.burgerMenuButton = page.locator('#react-burger-menu-btn');
    this.logoutLink = page.locator('#logout_sidebar_link');
    this.productSortDropdown = page.locator('[data-test="product_sort_container"]');
  }

  async getPageTitle(): Promise<string | null> {
    return await this.pageTitle.textContent();
  }

  async getProductsCount(): Promise<number> {
    return await this.inventoryItems.count();
  }

  async addProductToCartByName(productName: string) {
    const product = this.page.locator('.inventory_item', { hasText: productName });
    await product.locator('button').click();
  }

  async addProductToCartByIndex(index: number) {
    const addToCartButtons = this.page.locator('button[class*="btn_inventory"]');
    await addToCartButtons.nth(index).click();
  }

  async getCartItemCount(): Promise<string | null> {
    if (await this.shoppingCartBadge.isVisible()) {
      return await this.shoppingCartBadge.textContent();
    }
    return '0';
  }

  async goToCart() {
    await this.shoppingCartLink.click();
  }

  async logout() {
    await this.burgerMenuButton.click();
    await this.logoutLink.click();
  }

  async sortProducts(option: 'az' | 'za' | 'lohi' | 'hilo') {
    await this.productSortDropdown.selectOption(option);
  }

  async getProductNames(): Promise<string[]> {
    const names = await this.page.locator('.inventory_item_name').allTextContents();
    return names;
  }

  async getProductPrices(): Promise<number[]> {
    const priceTexts = await this.page.locator('.inventory_item_price').allTextContents();
    return priceTexts.map(price => parseFloat(price.replace('$', '')));
  }
}