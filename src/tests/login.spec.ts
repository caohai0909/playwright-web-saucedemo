import { test, expect } from '../fixtures/customFixtures';
import { TestData } from '../data/testData';

test.describe('Login Functionality Tests', { tag: '@login' }, () => {
  test.beforeEach(async ({ loginPage }) => {
    await loginPage.navigateToLogin();
  });

  test('TC001: Login successfully with valid standard user', { tag: ['@smoke', '@critical'] }, async ({ loginPage, productsPage }) => {
    await loginPage.login(
      TestData.validUsers.standard.username,
      TestData.validUsers.standard.password
    );
    
    await expect(productsPage.page).toHaveURL(/.*inventory.html/);
    const pageTitle = await productsPage.getPageTitle();
    expect(pageTitle).toBe('Products');
  });

  test('TC002: Login failed with locked out user', { tag: '@negative' }, async ({ loginPage }) => {
    await loginPage.login(
      TestData.invalidUsers.locked.username,
      TestData.invalidUsers.locked.password
    );
    
    const errorMessage = await loginPage.getErrorMessage();
    expect(errorMessage).toContain(TestData.errorMessages.lockedUser);
    expect(await loginPage.isErrorMessageVisible()).toBeTruthy();
  });

  test('TC003: Login failed with invalid username', { tag: '@negative' }, async ({ loginPage }) => {
    await loginPage.login(
      TestData.invalidUsers.invalidUsername.username,
      TestData.invalidUsers.invalidUsername.password
    );
    
    const errorMessage = await loginPage.getErrorMessage();
    expect(errorMessage).toContain(TestData.errorMessages.invalidCredentials);
  });

  test('TC004: Login failed with invalid password', { tag: '@negative' }, async ({ loginPage }) => {
    await loginPage.login(
      TestData.invalidUsers.invalidPassword.username,
      TestData.invalidUsers.invalidPassword.password
    );
    
    const errorMessage = await loginPage.getErrorMessage();
    expect(errorMessage).toContain(TestData.errorMessages.invalidCredentials);
  });

  test('TC005: Login failed with empty username', { tag: ['@negative', '@validation'] }, async ({ loginPage }) => {
    await loginPage.login('', TestData.validUsers.standard.password);
    
    const errorMessage = await loginPage.getErrorMessage();
    expect(errorMessage).toContain(TestData.errorMessages.usernameRequired);
  });

  test('TC006: Login failed with empty password', { tag: ['@negative', '@validation'] }, async ({ loginPage }) => {
    await loginPage.login(TestData.validUsers.standard.username, '');
    
    const errorMessage = await loginPage.getErrorMessage();
    expect(errorMessage).toContain(TestData.errorMessages.passwordRequired);
  });

  test('TC007: Login failed with empty credentials', { tag: ['@negative', '@validation'] }, async ({ loginPage }) => {
    await loginPage.login('', '');
    
    const errorMessage = await loginPage.getErrorMessage();
    expect(errorMessage).toContain(TestData.errorMessages.usernameRequired);
  });
});