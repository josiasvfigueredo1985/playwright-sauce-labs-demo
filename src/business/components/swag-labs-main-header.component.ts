import { BaseComponent } from './base-component'
import { ButtonComponent } from '../../framework/components/button.component'
import { TextComponent } from '../../framework/components/text.component'
import { DataTestComponent } from '../../framework/components/data-test.component'

export class SwagLabsMainHeaderComponent extends BaseComponent {
  private get container(): DataTestComponent {
    return new DataTestComponent(this.root, 'header-container')
  }

  private get shoppingCartLink(): DataTestComponent {
    return new DataTestComponent(this.container, 'shopping-cart-link')
  }

  get openMenuButton(): ButtonComponent {
    return new ButtonComponent(this.container, 'Open Menu')
  }

  get logoText(): TextComponent {
    return new TextComponent(this.container, 'Swag Labs', { exact: true })
  }

  get shoppingCartEmpty(): ButtonComponent {
    return new ButtonComponent(this.container, /^Cart, empty$/, {
      and: this.shoppingCartLink,
    })
  }

  get shoppingCartWithItems(): ButtonComponent {
    return new ButtonComponent(this.container, /^Cart, (\d+ items)$/, {
      and: this.shoppingCartLink,
    })
  }
}
