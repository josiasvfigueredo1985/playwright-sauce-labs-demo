import { test } from '@playwright/test'
import { InventoryPage } from '../../src/business/pages/inventory.page'
import { LoginPage } from '../../src/business/pages/login.page'
import { ProductSortOptions } from '../../src/business/resources/product-sort-options'
import { standardUser } from '../../src/business/resources/users'
import { AuthenticationWorkflow } from '../../src/business/workflows/authentication.workflow'

test.describe('Inventory product sorting', () => {
  test('changes the active sort option when another option is selected', async ({
    page,
  }) => {
    const authentication = new AuthenticationWorkflow(new LoginPage(page))
    const inventoryPage = new InventoryPage(page)

    await authentication.signIn(standardUser.username, standardUser.password)

    await inventoryPage.secondaryHeader
      .activeOption(ProductSortOptions.NameAtoZ)
      .toBeVisible()
    await inventoryPage.secondaryHeader.priceLowToHigh.click()
    await inventoryPage.secondaryHeader
      .activeOption(ProductSortOptions.PriceLowToHigh)
      .toBeVisible()

    await inventoryPage.products.sauceLabsBackpack.addToCart.click()

    await inventoryPage.headerContainer.shoppingCartWithItems.toContainText('1')
  })
})
