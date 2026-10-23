import { standardUser } from '../../src/business/resources/users'
import { InventoryPage } from '../../src/business/pages/inventory.page'
import { LoginPage } from '../../src/business/pages/login.page'
import { AuthenticationWorkflow } from '../../src/business/workflows/authentication.workflow'
import { test } from '@playwright/test'
import { ProductSortOptions } from '../../src/business/resources/product-sort-options'
import { MenuSidebarOptions } from '../../src/business/resources/menu-sidebar-options'

test.describe('Login', () => {
  test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page)
    await loginPage.goto()
  })

  test('allows a standard user to sign in', async ({ page }) => {
    const loginPage = new LoginPage(page)
    const authentication = new AuthenticationWorkflow(loginPage)
    const inventoryPage = new InventoryPage(page)

    await authentication.signIn(standardUser.username, standardUser.password)

    await inventoryPage.expectCurrentPage()
    await inventoryPage.headerContainer.logoText.toBeVisible()
    await inventoryPage.headerContainer.shoppingCartEmpty.toBeVisible()
    await inventoryPage.secondaryHeader
      .activeOption(ProductSortOptions.NameAtoZ)
      .toBeVisible()
    await inventoryPage.secondaryHeader.priceLowToHigh.click()
    await inventoryPage.secondaryHeader
      .activeOption(ProductSortOptions.PriceLowToHigh)
      .toBeVisible()
  })

  test('shows every menu option after opening the sidebar', async ({
    page,
  }) => {
    const authentication = new AuthenticationWorkflow(new LoginPage(page))
    const inventoryPage = new InventoryPage(page)

    await authentication.signIn(standardUser.username, standardUser.password)
    await inventoryPage.headerContainer.openMenuButton.click()

    await inventoryPage.menuSidebar.allItems.toBeVisible()
    await inventoryPage.menuSidebar.allItems.toHaveText(
      MenuSidebarOptions.AllItems,
    )
    await inventoryPage.menuSidebar.dynamicCatalog.toHaveText(
      MenuSidebarOptions.DynamicCatalog,
    )
    await inventoryPage.menuSidebar.about.toHaveText(MenuSidebarOptions.About)
    await inventoryPage.menuSidebar.logout.toHaveText(MenuSidebarOptions.Logout)
    await inventoryPage.menuSidebar.resetAppState.toHaveText(
      MenuSidebarOptions.ResetAppState,
    )

    await inventoryPage.menuSidebar.closeMenuButton.click()
    await inventoryPage.menuSidebar.logout.not.toBeVisible()
  })
})
