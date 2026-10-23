import { BaseComponent } from './base.component'
import { TestIds } from '../resources/test-ids'
import { MainHeaderOptions } from '../resources/main-header-options'
import { ButtonComponent } from '../../framework/components/button.component'
import { TextComponent } from '../../framework/components/text.component'
import { DataTestComponent } from '../../framework/components/data-test.component'

export class SwagLabsMainHeaderComponent extends BaseComponent {
  private get container(): DataTestComponent {
    return new DataTestComponent(this.root, TestIds.mainHeader)
  }

  private get shoppingCartLink(): DataTestComponent {
    return new DataTestComponent(this.container, TestIds.shoppingCartLink)
  }

  get openMenuButton(): ButtonComponent {
    return new ButtonComponent(this.container, MainHeaderOptions.OpenMenu)
  }

  get logoText(): TextComponent {
    return new TextComponent(this.container, MainHeaderOptions.Logo, {
      exact: true,
    })
  }

  get shoppingCartEmpty(): ButtonComponent {
    return new ButtonComponent(this.container, MainHeaderOptions.CartEmpty, {
      and: this.shoppingCartLink,
    })
  }

  get shoppingCartWithItems(): ButtonComponent {
    return new ButtonComponent(
      this.container,
      MainHeaderOptions.CartWithItems,
      { and: this.shoppingCartLink },
    )
  }
}
