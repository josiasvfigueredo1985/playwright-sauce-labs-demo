import { standardUser } from '../../src/business/resources/users';
import { InventoryPage } from '../../src/business/pages/inventory.page';
import { LoginPage } from '../../src/business/pages/login.page';
import { AuthenticationWorkflow } from '../../src/business/workflows/authentication.workflow';
import { expect, test } from '../../src/business/fixtures/url.fixture';

test('allows a standard user to sign in', async ({ page, url }) => {
  const loginPage = new LoginPage(page);
  const authentication = new AuthenticationWorkflow(loginPage, url);
  const inventoryPage = new InventoryPage(page);

  await authentication.signIn(standardUser.username, standardUser.password);

  await url.expect(inventoryPage);
  await expect(inventoryPage.heading).toBeVisible();
});
