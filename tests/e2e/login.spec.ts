import { standardUser } from '../../src/business/resources/users';
import { InventoryPage } from '../../src/business/pages/inventory.page';
import { LoginPage } from '../../src/business/pages/login.page';
import { AuthenticationWorkflow } from '../../src/business/workflows/authentication.workflow';
import { test } from '../../src/business/fixtures/url.fixture';

test.describe('Login', () => {
  test.beforeEach(async ({ page, url }) => {
    const loginPage = new LoginPage(page, url);
    await loginPage.goto();
  });
  
test("allows a standard user to sign in", async ({ page, url }) => {
  const loginPage = new LoginPage(page, url);
  const authentication = new AuthenticationWorkflow(loginPage);
  const inventoryPage = new InventoryPage(page, url);

  await authentication.signIn(standardUser.username, standardUser.password);

  await inventoryPage.expectCurrentPage();
  await inventoryPage.productsText.toBeVisible();
});

});

