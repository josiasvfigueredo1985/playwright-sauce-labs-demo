import { test } from '@playwright/test'
import { InventoryPage } from '../../src/business/pages/inventory.page'
import { LoginPage } from '../../src/business/pages/login.page'
import { MenuSidebarOptions } from '../../src/business/resources/menu-sidebar-options'
import { standardUser } from '../../src/business/resources/users'
import { AuthenticationWorkflow } from '../../src/business/workflows/authentication.workflow'

test.describe('Menu sidebar', () => {
  test('shows every menu option after opening the sidebar and hides them on close', async ({
    page,
  }) => {
    const authentication = new AuthenticationWorkflow(new LoginPage(page))
    const inventoryPage = new InventoryPage(page)

    await authentication.signIn(standardUser.username, standardUser.password)
    await inventoryPage.headerContainer.openMenuButton.click()

    await inventoryPage.menuSidebar.allItems.toHaveText(
      MenuSidebarOptions.AllItems,
    )
    await inventoryPage.menuSidebar.dynamicCatalog.button.toHaveText(
      MenuSidebarOptions.DynamicCatalog,
    )
    await inventoryPage.menuSidebar.dynamicCatalog.button.click()
    await inventoryPage.menuSidebar.dynamicCatalog.lazyLoad.toHaveText(
      MenuSidebarOptions.LazyLoad,
    )
    await inventoryPage.menuSidebar.dynamicCatalog.spinner.toHaveText(
      MenuSidebarOptions.Spinner,
    )
    await inventoryPage.menuSidebar.dynamicCatalog.slider.toHaveText(
      MenuSidebarOptions.Slider,
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
