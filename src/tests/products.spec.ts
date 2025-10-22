import { test, expect } from '../fixtures/customFixtures';
import { TestData } from '../utils/testData';
import { Helpers } from '../utils/helpers';

test.describe('Products Page Tests', { tag: '@products' }, () => {
  test.beforeEach(async ({ loginPage, productsPage }) => {
    await loginPage.navigateToLogin();
    await loginPage.login(
      TestData.validUsers.standard.username,
      TestData.validUsers.standard.password
    );
    await productsPage.page.waitForURL(/.*inventory.html/);
  });

  test('TC101: Verify products page loads correctly', { tag: '@smoke' }, async ({ productsPage }) => {
    const pageTitle = await productsPage.getPageTitle();
    expect(pageTitle).toBe('Products');
    
    const productsCount = await productsPage.getProductsCount();
    expect(productsCount).toBeGreaterThan(0);
  });

  test('TC102: Add single product to cart', { tag: ['@smoke', '@cart'] }, async ({ productsPage }) => {
    await productsPage.addProductToCartByName(TestData.products.backpack);
    
    const cartCount = await productsPage.getCartItemCount();
    expect(cartCount).toBe('1');
  });

  test('TC103: Add multiple products to cart', { tag: '@cart' }, async ({ productsPage }) => {
    await productsPage.addProductToCartByName(TestData.products.backpack);
    await productsPage.addProductToCartByName(TestData.products.bikeLight);
    await productsPage.addProductToCartByName(TestData.products.boltTshirt);
    
    const cartCount = await productsPage.getCartItemCount();
    expect(cartCount).toBe('3');
  });

  test('TC104: Sort products by name A to Z', { tag: ['@sorting', '@ui'] }, async ({ productsPage }) => {
    await productsPage.sortProducts('az');
    
    const productNames = await productsPage.getProductNames();
    expect(Helpers.isSortedAscending(productNames)).toBeTruthy();
  });

  test('TC105: Sort products by name Z to A', { tag: ['@sorting', '@ui'] }, async ({ productsPage }) => {
    await productsPage.sortProducts('za');
    
    const productNames = await productsPage.getProductNames();
    expect(Helpers.isSortedDescending(productNames)).toBeTruthy();
  });

  test('TC106: Sort products by price low to high', { tag: ['@sorting', '@ui'] }, async ({ productsPage }) => {
    await productsPage.sortProducts('lohi');
    
    const prices = await productsPage.getProductPrices();
    expect(Helpers.isSortedAscending(prices)).toBeTruthy();
  });

  test('TC107: Sort products by price high to low', { tag: ['@sorting', '@ui'] }, async ({ productsPage }) => {
    await productsPage.sortProducts('hilo');
    
    const prices = await productsPage.getProductPrices();
    expect(Helpers.isSortedDescending(prices)).toBeTruthy();
  });

  test('TC108: Navigate to shopping cart', { tag: '@navigation' }, async ({ productsPage, cartPage }) => {
    await productsPage.addProductToCartByName(TestData.products.backpack);
    await productsPage.goToCart();
    
    await expect(cartPage.page).toHaveURL(/.*cart.html/);
    const pageTitle = await cartPage.getPageTitle();
    expect(pageTitle).toBe('Your Cart');
  });

  test('TC109: Logout from products page', { tag: '@logout' }, async ({ loginPage, productsPage }) => {
    await productsPage.logout();
    
    await expect(loginPage.page).toHaveURL('/');
  });
});