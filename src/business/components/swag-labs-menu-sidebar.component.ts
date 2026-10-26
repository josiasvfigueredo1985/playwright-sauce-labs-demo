import {
  ButtonComponent,
  DataTestComponent,
  LinkComponent,
} from '../../framework/components'
import { DynamicCatalogMenu } from '../interfaces/dynamic-catalog-menu.interface'
import { MenuSidebarOptions } from '../resources/menu-sidebar-options'
import { TestIds } from '../resources/test-ids'
import { BaseComponent } from './base.component'

export class SwagLabsMenuSidebarComponent extends BaseComponent {
  get closeMenuButton(): ButtonComponent {
    return new ButtonComponent(this.root, MenuSidebarOptions.CloseMenu)
  }

  get allItems(): ButtonComponent {
    return new ButtonComponent(this.root, MenuSidebarOptions.AllItems)
  }

  get dynamicCatalog(): DynamicCatalogMenu {
    return {
      button: this.dynamicCatalogButton,
      lazyLoad: this.lazyLoad,
      spinner: this.spinner,
      slider: this.slider,
    }
  }

  get about(): LinkComponent {
    return new LinkComponent(this.root, MenuSidebarOptions.About)
  }

  get logout(): ButtonComponent {
    return new ButtonComponent(this.root, MenuSidebarOptions.Logout)
  }

  get resetAppState(): ButtonComponent {
    return new ButtonComponent(this.root, MenuSidebarOptions.ResetAppState)
  }

  private get dynamicCatalogButton(): ButtonComponent {
    return new ButtonComponent(this.root, MenuSidebarOptions.DynamicCatalog)
  }

  private get dynamicCatalogSubmenu(): DataTestComponent {
    return new DataTestComponent(this.root, TestIds.dynamicCatalogSubmenu)
  }

  private get lazyLoad(): ButtonComponent {
    return new ButtonComponent(
      this.dynamicCatalogSubmenu,
      MenuSidebarOptions.LazyLoad,
    )
  }

  private get spinner(): ButtonComponent {
    return new ButtonComponent(
      this.dynamicCatalogSubmenu,
      MenuSidebarOptions.Spinner,
    )
  }

  private get slider(): ButtonComponent {
    return new ButtonComponent(
      this.dynamicCatalogSubmenu,
      MenuSidebarOptions.Slider,
    )
  }
}
