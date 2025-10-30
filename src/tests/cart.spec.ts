import { test, expect } from '../fixtures/customFixtures';
import { TestData } from '../data/testData';

test.describe('Shopping Cart Tests', { tag: '@cart' }, () => {
  test.beforeEach(async ({ loginPage, productsPage }) => {
    await loginPage.navigateToLogin();
    await loginPage.login(
      TestData.validUsers.standard.username,
      TestData.validUsers.standard.password
    );
    await productsPage.page.waitForURL(/.*inventory.html/);
  });

  test('TC201: View empty cart', { tag: '@smoke' }, async ({ productsPage, cartPage }) => {
    await productsPage.goToCart();
    
    const itemsCount = await cartPage.getCartItemsCount();
    expect(itemsCount).toBe(0);
    expect(await cartPage.isCartEmpty()).toBeTruthy();
  });

  test('TC202: View cart with items', { tag: '@smoke' }, async ({ productsPage, cartPage }) => {
    await productsPage.addProductToCartByName(TestData.products.backpack);
    await productsPage.addProductToCartByName(TestData.products.bikeLight);
    await productsPage.goToCart();
    
    const itemsCount = await cartPage.getCartItemsCount();
    expect(itemsCount).toBe(2);
    
    const itemNames = await cartPage.getCartItemNames();
    expect(itemNames).toContain(TestData.products.backpack);
    expect(itemNames).toContain(TestData.products.bikeLight);
  });

  test('TC203: Remove item from cart', { tag: '@regression' }, async ({ productsPage, cartPage }) => {
    await productsPage.addProductToCartByName(TestData.products.backpack);
    await productsPage.addProductToCartByName(TestData.products.bikeLight);
    await productsPage.goToCart();
    
    await cartPage.removeItemByName(TestData.products.backpack);
    
    const itemsCount = await cartPage.getCartItemsCount();
    expect(itemsCount).toBe(1);
    
    const itemNames = await cartPage.getCartItemNames();
    expect(itemNames).not.toContain(TestData.products.backpack);
    expect(itemNames).toContain(TestData.products.bikeLight);
  });

  test('TC204: Remove all items from cart', { tag: '@regression' }, async ({ productsPage, cartPage }) => {
    await productsPage.addProductToCartByName(TestData.products.backpack);
    await productsPage.addProductToCartByName(TestData.products.bikeLight);
    await productsPage.goToCart();
    
    await cartPage.removeItemByName(TestData.products.backpack);
    await cartPage.removeItemByName(TestData.products.bikeLight);
    
    expect(await cartPage.isCartEmpty()).toBeTruthy();
  });

  test('TC205: Continue shopping from cart', { tag: '@navigation' }, async ({ productsPage, cartPage }) => {
    await productsPage.goToCart();
    await cartPage.continueShopping();
    
    await expect(productsPage.page).toHaveURL(/.*inventory.html/);
  });

  test('TC206: Proceed to checkout from cart', { tag: ['@smoke', '@checkout'] }, async ({ productsPage, cartPage, checkoutPage }) => {
    await productsPage.addProductToCartByName(TestData.products.backpack);
    await productsPage.goToCart();
    await cartPage.proceedToCheckout();
    
    await expect(checkoutPage.page).toHaveURL(/.*checkout-step-one.html/);
  });
});