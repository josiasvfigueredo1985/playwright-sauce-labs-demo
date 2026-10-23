import { test } from '@playwright/test'
import { DynamicCatalogSpinnerPage } from '../../src/business/pages/dynamic-catalog-spinner.page'
import { InventoryPage } from '../../src/business/pages/inventory.page'
import { LoginPage } from '../../src/business/pages/login.page'
import { standardUser } from '../../src/business/resources/users'
import { AuthenticationWorkflow } from '../../src/business/workflows/authentication.workflow'

test.describe('Dynamic catalog spinner', () => {
  test('shows the loading spinner and then hides it after opening the spinner page from the menu', async ({
    page,
  }) => {
    const authentication = new AuthenticationWorkflow(new LoginPage(page))
    const inventoryPage = new InventoryPage(page)
    const spinnerPage = new DynamicCatalogSpinnerPage(page)

    await authentication.signIn(standardUser.username, standardUser.password)
    await inventoryPage.headerContainer.openMenuButton.click()
    await inventoryPage.menuSidebar.dynamicCatalog.button.click()
    await inventoryPage.menuSidebar.dynamicCatalog.spinner.click()

    await spinnerPage.expectCurrentPage()
    await spinnerPage.spinner.toBeVisible()
    await spinnerPage.spinner.not.toBeVisible()
  })
})
