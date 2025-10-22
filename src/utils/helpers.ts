import { Page } from '@playwright/test';

export class Helpers {
  /**
   * Take a screenshot with timestamp
   */
  static async takeScreenshot(page: Page, name: string) {
    const timestamp = new Date().toISOString().replace(/:/g, '-');
    await page.screenshot({ 
      path: `screenshots/${name}-${timestamp}.png`, 
      fullPage: true 
    });
  }

  /**
   * Wait for network to be idle
   */
  static async waitForNetworkIdle(page: Page) {
    await page.waitForLoadState('networkidle');
  }

  /**
   * Wait for DOM to be ready
   */
  static async waitForDOMContentLoaded(page: Page) {
    await page.waitForLoadState('domcontentloaded');
  }

  /**
   * Generate random string
   */
  static generateRandomString(length: number = 10): string {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return result;
  }

  /**
   * Generate random email
   */
  static generateRandomEmail(): string {
    return `test_${Date.now()}_${this.generateRandomString(5)}@example.com`;
  }

  /**
   * Wait for specific time
   */
  static async wait(milliseconds: number) {
    await new Promise(resolve => setTimeout(resolve, milliseconds));
  }

  /**
   * Get current date in format YYYY-MM-DD
   */
  static getCurrentDate(): string {
    return new Date().toISOString().split('T')[0];
  }

  /**
   * Get current timestamp
   */
  static getTimestamp(): number {
    return Date.now();
  }

  /**
   * Scroll to element
   */
  static async scrollToElement(page: Page, selector: string) {
    await page.locator(selector).scrollIntoViewIfNeeded();
  }

  /**
   * Check if array is sorted in ascending order
   */
  static isSortedAscending(arr: (string | number)[]): boolean {
    for (let i = 0; i < arr.length - 1; i++) {
      if (arr[i] > arr[i + 1]) {
        return false;
      }
    }
    return true;
  }

  /**
   * Check if array is sorted in descending order
   */
  static isSortedDescending(arr: (string | number)[]): boolean {
    for (let i = 0; i < arr.length - 1; i++) {
      if (arr[i] < arr[i + 1]) {
        return false;
      }
    }
    return true;
  }
}