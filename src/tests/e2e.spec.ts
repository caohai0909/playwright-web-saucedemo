import { test, expect } from '../fixtures/customFixtures';
import { TestData } from '../data/testData';
import { SUCCESS_MESSAGES } from '../utils/constants';

test.describe('End-to-End User Journey Tests', { tag: '@e2e' }, () => {
  test('E2E001: Complete shopping journey from login to order completion', { 
    tag: ['@smoke', '@critical', '@full-flow'] 
  }, async ({ 
    loginPage, 
    productsPage, 
    cartPage, 
    checkoutPage 
  }) => {
    // Step 1: Login
    await loginPage.navigateToLogin();
    await loginPage.login(
      TestData.validUsers.standard.username,
      TestData.validUsers.standard.password
    );
    await expect(productsPage.page).toHaveURL(/.*inventory.html/);

    // Step 2: Add products to cart
    await productsPage.addProductToCartByName(TestData.products.backpack);
    await productsPage.addProductToCartByName(TestData.products.bikeLight);
    await productsPage.addProductToCartByName(TestData.products.boltTshirt);
    
    const cartCount = await productsPage.getCartItemCount();
    expect(cartCount).toBe('3');

    // Step 3: Go to cart and verify items
    await productsPage.goToCart();
    await expect(cartPage.page).toHaveURL(/.*cart.html/);
    
    const cartItems = await cartPage.getCartItemsCount();
    expect(cartItems).toBe(3);

    // Step 4: Remove one item
    await cartPage.removeItemByName(TestData.products.boltTshirt);
    expect(await cartPage.getCartItemsCount()).toBe(2);

    // Step 5: Proceed to checkout
    await cartPage.proceedToCheckout();
    await expect(checkoutPage.page).toHaveURL(/.*checkout-step-one.html/);

    // Step 6: Fill checkout information
    await checkoutPage.fillCheckoutInformation(
      TestData.checkoutInfo.valid.firstName,
      TestData.checkoutInfo.valid.lastName,
      TestData.checkoutInfo.valid.postalCode
    );
    await checkoutPage.continueToOverview();

    // Step 7: Verify overview and finish
    await expect(checkoutPage.page).toHaveURL(/.*checkout-step-two.html/);
    const totalPrice = await checkoutPage.getTotalPrice();
    expect(totalPrice).toBeTruthy();

    await checkoutPage.finishCheckout();

    // Step 8: Verify order completion
    await expect(checkoutPage.page).toHaveURL(/.*checkout-complete.html/);
    expect(await checkoutPage.isOrderComplete()).toBeTruthy();
    
    const completeHeader = await checkoutPage.getCompleteHeader();
    expect(completeHeader).toContain(SUCCESS_MESSAGES.ORDER_COMPLETE);
    
    const completeText = await checkoutPage.getCompleteText();
    expect(completeText).toContain(SUCCESS_MESSAGES.ORDER_DISPATCHED);
  });

  test('E2E002: Add products, sort, and complete purchase', { 
    tag: ['@regression', '@sorting'] 
  }, async ({ 
    loginPage, 
    productsPage, 
    cartPage, 
    checkoutPage 
  }) => {
    // Login
    await loginPage.navigateToLogin();
    await loginPage.login(
      TestData.validUsers.standard.username,
      TestData.validUsers.standard.password
    );

    // Sort products by price low to high
    await productsPage.sortProducts('lohi');
    
    // Add cheapest products
    await productsPage.addProductToCartByIndex(0);
    await productsPage.addProductToCartByIndex(1);

    // Go to cart and checkout
    await productsPage.goToCart();
    await cartPage.proceedToCheckout();

    // Complete checkout
    await checkoutPage.fillCheckoutInformation(
      TestData.checkoutInfo.valid.firstName,
      TestData.checkoutInfo.valid.lastName,
      TestData.checkoutInfo.valid.postalCode
    );
    await checkoutPage.continueToOverview();
    await checkoutPage.finishCheckout();

    // Verify completion
    expect(await checkoutPage.isOrderComplete()).toBeTruthy();
  });

  test('E2E003: Multiple users login and purchase', { 
    tag: ['@regression', '@multi-user'] 
  }, async ({ page }) => {
    const { LoginPage } = await import('../pages/LoginPage');
    const { ProductsPage } = await import('../pages/ProductsPage');
    const { CartPage } = await import('../pages/CartPage');
    const { CheckoutPage } = await import('../pages/CheckoutPage');

    const loginPage = new LoginPage(page);
    const productsPage = new ProductsPage(page);
    const cartPage = new CartPage(page);
    const checkoutPage = new CheckoutPage(page);

    // User 1: Standard user
    await loginPage.navigateToLogin();
    await loginPage.login(
      TestData.validUsers.standard.username,
      TestData.validUsers.standard.password
    );
    await productsPage.addProductToCartByName(TestData.products.backpack);
    await productsPage.goToCart();
    await cartPage.proceedToCheckout();
    await checkoutPage.fillCheckoutInformation('User', 'One', '11111');
    await checkoutPage.continueToOverview();
    await checkoutPage.finishCheckout();
    expect(await checkoutPage.isOrderComplete()).toBeTruthy();
    
    // Logout
    await checkoutPage.backToHome();
    await productsPage.logout();

    // User 2: Performance user
    await loginPage.login(
      TestData.validUsers.performance.username,
      TestData.validUsers.performance.password
    );
    await productsPage.addProductToCartByName(TestData.products.bikeLight);
    await productsPage.goToCart();
    await cartPage.proceedToCheckout();
    await checkoutPage.fillCheckoutInformation('User', 'Two', '22222');
    await checkoutPage.continueToOverview();
    await checkoutPage.finishCheckout();
    expect(await checkoutPage.isOrderComplete()).toBeTruthy();
  });
});