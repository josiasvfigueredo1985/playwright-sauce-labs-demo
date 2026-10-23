import { ButtonComponent, LinkComponent } from '../../framework/components'
import { MenuSidebarOptions } from '../resources/menu-sidebar-options'
import { BaseComponent } from './base.component'

export class SwagLabsMenuSidebarComponent extends BaseComponent {
  get closeMenuButton(): ButtonComponent {
    return new ButtonComponent(this.root, MenuSidebarOptions.CloseMenu)
  }

  get allItems(): ButtonComponent {
    return new ButtonComponent(this.root, MenuSidebarOptions.AllItems)
  }

  get dynamicCatalog(): ButtonComponent {
    return new ButtonComponent(this.root, MenuSidebarOptions.DynamicCatalog)
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
}
