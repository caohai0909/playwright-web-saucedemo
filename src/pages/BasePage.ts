import { Page, Locator } from '@playwright/test';

export class BasePage {
  public readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async navigate(url: string) {
    await this.page.goto(url);
  }

  async click(selector: string) {
    await this.page.click(selector);
  }

  async fill(selector: string, text: string) {
    await this.page.fill(selector, text);
  }

  async getText(selector: string): Promise<string | null> {
    return await this.page.textContent(selector);
  }

  async waitForSelector(selector: string) {
    await this.page.waitForSelector(selector);
  }

  async waitForUrl(url: string | RegExp) {
    await this.page.waitForURL(url);
  }

  async isVisible(selector: string): Promise<boolean> {
    return await this.page.isVisible(selector);
  }

  async getElementCount(selector: string): Promise<number> {
    return await this.page.locator(selector).count();
  }

  async screenshot(name: string) {
    await this.page.screenshot({ path: `screenshots/${name}.png`, fullPage: true });
  }
}