import { BaseWebPage } from '../../framework/bases/base-web.page'
import { SwagLabsMainHeaderComponent } from '../components/swag-labs-main-header.component'
import { SwagLabsMenuSidebarComponent } from '../components/swag-labs-menu-sidebar.component'
import { createItemMap } from '../../framework/factories/item.factory'
import { createCategoryMap } from '../../framework/factories/category.factory'
import { MenuCategories, ProductNames } from '../resources/inventory'
import { CategoryPage } from './category.page'
import { SwagLabsProductCardComponent } from '../components/swag-labs-product-card.component'
import { SwagLabsSecondaryHeaderComponent } from '../components/swag-labs-secondary-header.component'

export class InventoryPage extends BaseWebPage {
  protected readonly path = '/inventory.html'
  get headerContainer(): SwagLabsMainHeaderComponent {
    return new SwagLabsMainHeaderComponent(this.page)
  }

  get menuSidebar(): SwagLabsMenuSidebarComponent {
    return new SwagLabsMenuSidebarComponent(this.page)
  }

  get products() {
    return createItemMap(
      ProductNames,
      (name) => new SwagLabsProductCardComponent(this.page, name),
    )
  }

  get categories() {
    return createCategoryMap(
      MenuCategories,
      (entry) => new CategoryPage(this.page, entry),
    )
  }

  get secondaryHeader(): SwagLabsSecondaryHeaderComponent {
    return new SwagLabsSecondaryHeaderComponent(this.page)
  }
}
