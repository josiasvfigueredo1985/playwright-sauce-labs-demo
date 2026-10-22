import {
  standardUser,
} from '../../src/business/resources/users';
import {
  InventoryPage,
} from '../../src/business/pages/inventory.page';
import {
  LoginPage,
} from '../../src/business/pages/login.page';
import {
  AuthenticationWorkflow,
} from '../../src/business/workflows/authentication.workflow';
import {test} from '@playwright/test';

test.describe('Login', () => {
  test.beforeEach(async ({page}) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
  });

  test('allows a standard user to sign in', async ({page}) => {
    const loginPage = new LoginPage(page);
    const authentication = new AuthenticationWorkflow(loginPage);
    const inventoryPage = new InventoryPage(page);

    await authentication.signIn(standardUser.username, standardUser.password);

    await inventoryPage.expectCurrentPage();
    await inventoryPage.headerContainer.toBeVisible();
    await inventoryPage.headerContainer.shoppingCartEmpty.toBeVisible();
  });
});
