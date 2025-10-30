import { test, expect } from '../fixtures/customFixtures';
import { TestData } from '../data/testData';
import { SUCCESS_MESSAGES } from '../utils/constants';

test.describe('Checkout Process Tests', { tag: '@checkout' }, () => {
  test.beforeEach(async ({ loginPage, productsPage, cartPage }) => {
    await loginPage.navigateToLogin();
    await loginPage.login(
      TestData.validUsers.standard.username,
      TestData.validUsers.standard.password
    );
    await productsPage.page.waitForURL(/.*inventory.html/);
    await productsPage.addProductToCartByName(TestData.products.backpack);
    await productsPage.goToCart();
    await cartPage.proceedToCheckout();
  });

  test('TC301: Complete checkout with valid information', { tag: ['@smoke', '@critical', '@e2e'] }, async ({ checkoutPage }) => {
    await checkoutPage.fillCheckoutInformation(
      TestData.checkoutInfo.valid.firstName,
      TestData.checkoutInfo.valid.lastName,
      TestData.checkoutInfo.valid.postalCode
    );
    await checkoutPage.continueToOverview();
    
    await expect(checkoutPage.page).toHaveURL(/.*checkout-step-two.html/);
    
    await checkoutPage.finishCheckout();
    
    await expect(checkoutPage.page).toHaveURL(/.*checkout-complete.html/);
    expect(await checkoutPage.isOrderComplete()).toBeTruthy();
    
    const completeHeader = await checkoutPage.getCompleteHeader();
    expect(completeHeader).toContain(SUCCESS_MESSAGES.ORDER_COMPLETE);
  });

  test('TC302: Checkout fails with empty first name', { tag: ['@negative', '@validation'] }, async ({ checkoutPage }) => {
    await checkoutPage.fillCheckoutInformation(
      '',
      TestData.checkoutInfo.valid.lastName,
      TestData.checkoutInfo.valid.postalCode
    );
    await checkoutPage.continueToOverview();
    
    const errorMessage = await checkoutPage.getErrorMessage();
    expect(errorMessage).toContain(TestData.errorMessages.firstNameRequired);
  });

  test('TC303: Checkout fails with empty last name', { tag: ['@negative', '@validation'] }, async ({ checkoutPage }) => {
    await checkoutPage.fillCheckoutInformation(
      TestData.checkoutInfo.valid.firstName,
      '',
      TestData.checkoutInfo.valid.postalCode
    );
    await checkoutPage.continueToOverview();
    
    const errorMessage = await checkoutPage.getErrorMessage();
    expect(errorMessage).toContain(TestData.errorMessages.lastNameRequired);
  });

  test('TC304: Checkout fails with empty postal code', { tag: ['@negative', '@validation'] }, async ({ checkoutPage }) => {
    await checkoutPage.fillCheckoutInformation(
      TestData.checkoutInfo.valid.firstName,
      TestData.checkoutInfo.valid.lastName,
      ''
    );
    await checkoutPage.continueToOverview();
    
    const errorMessage = await checkoutPage.getErrorMessage();
    expect(errorMessage).toContain(TestData.errorMessages.postalCodeRequired);
  });

  test('TC305: Checkout fails with all empty fields', { tag: ['@negative', '@validation'] }, async ({ checkoutPage }) => {
    await checkoutPage.fillCheckoutInformation('', '', '');
    await checkoutPage.continueToOverview();
    
    const errorMessage = await checkoutPage.getErrorMessage();
    expect(errorMessage).toContain('Error:');
  });

  test('TC306: Cancel checkout from information page', { tag: '@navigation' }, async ({ checkoutPage, cartPage }) => {
    await checkoutPage.cancelCheckout();
    
    await expect(cartPage.page).toHaveURL(/.*cart.html/);
  });

  test('TC307: Verify total price in checkout overview', { tag: '@regression' }, async ({ checkoutPage }) => {
    await checkoutPage.fillCheckoutInformation(
      TestData.checkoutInfo.valid.firstName,
      TestData.checkoutInfo.valid.lastName,
      TestData.checkoutInfo.valid.postalCode
    );
    await checkoutPage.continueToOverview();
    
    const totalPrice = await checkoutPage.getTotalPrice();
    expect(totalPrice).toBeTruthy();
    expect(totalPrice).toContain('Total:');
  });

  test('TC308: Navigate back to home after successful order', { tag: '@navigation' }, async ({ checkoutPage, productsPage }) => {
    await checkoutPage.fillCheckoutInformation(
      TestData.checkoutInfo.valid.firstName,
      TestData.checkoutInfo.valid.lastName,
      TestData.checkoutInfo.valid.postalCode
    );
    await checkoutPage.continueToOverview();
    await checkoutPage.finishCheckout();
    
    await checkoutPage.backToHome();
    
    await expect(productsPage.page).toHaveURL(/.*inventory.html/);
  });
});