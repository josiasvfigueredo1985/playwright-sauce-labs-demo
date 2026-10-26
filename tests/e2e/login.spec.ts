import { test } from '@playwright/test'
import { InventoryPage } from '../../src/business/pages/inventory.page'
import { LoginPage } from '../../src/business/pages/login.page'
import { standardUser } from '../../src/business/resources/users'
import { AuthenticationWorkflow } from '../../src/business/workflows/authentication.workflow'

test.describe('Login', () => {
  test('allows a standard user to sign in and reach the inventory page', async ({
    page,
  }) => {
    const authentication = new AuthenticationWorkflow(new LoginPage(page))
    const inventoryPage = new InventoryPage(page)

    await authentication.signIn(standardUser.username, standardUser.password)

    await inventoryPage.expectCurrentPage()
    await inventoryPage.headerContainer.logoText.toBeVisible()
    await inventoryPage.headerContainer.shoppingCartEmpty.toBeVisible()
  })
})
