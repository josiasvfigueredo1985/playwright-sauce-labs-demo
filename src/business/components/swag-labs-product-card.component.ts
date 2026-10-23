import {
  ButtonComponent,
  DataTestComponent,
  TextComponent,
} from '../../framework/components'
import type { LocatorParent } from '../../framework/types/locator.types'
import { ProductCardOptions } from '../resources/product-card-options'
import { TestIds } from '../resources/test-ids'
import { BaseComponent } from './base.component'

export class SwagLabsProductCardComponent extends BaseComponent {
  constructor(
    root: LocatorParent,
    private readonly productName: string,
  ) {
    super(root)
  }

  get addToCart(): ButtonComponent {
    return new ButtonComponent(this.productCard, ProductCardOptions.AddToCart)
  }

  get titleButton(): ButtonComponent {
    return new ButtonComponent(
      this.productCard,
      ProductCardOptions.viewDetailsLabel(this.productName),
      {
        filter: { has: this.name },
      },
    )
  }

  get imageButton(): ButtonComponent {
    return new ButtonComponent(
      this.productCard,
      ProductCardOptions.viewDetailsLabel(this.productName),
      {
        filter: { hasNot: this.name },
      },
    )
  }

  private get name(): DataTestComponent {
    return new DataTestComponent(this.root, TestIds.inventoryItemName)
  }

  get productCard(): DataTestComponent {
    return new DataTestComponent(this.root, TestIds.inventoryItem, {
      childLocator: new TextComponent(this.root, this.productName, {
        exact: true,
      }),
    })
  }
}
