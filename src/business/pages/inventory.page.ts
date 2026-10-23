import { BaseWebPage } from '../../framework/bases/base-web-page'
import { SwagLabsMainHeaderComponent } from '../components/swag-labs-main-header.component'
import { SwagLabsMenuSidebarComponent } from '../components/swag-labs-menu-sidebar.component'
import { SwagLabsSecondaryHeaderComponent } from '../components/swag-labs-secondary-header.component'

export class InventoryPage extends BaseWebPage {
  protected readonly path = '/inventory.html'
  get headerContainer(): SwagLabsMainHeaderComponent {
    return new SwagLabsMainHeaderComponent(this.page)
  }

  get menuSidebar(): SwagLabsMenuSidebarComponent {
    return new SwagLabsMenuSidebarComponent(this.page)
  }

  get secondaryHeader(): SwagLabsSecondaryHeaderComponent {
    return new SwagLabsSecondaryHeaderComponent(this.page)
  }
}
