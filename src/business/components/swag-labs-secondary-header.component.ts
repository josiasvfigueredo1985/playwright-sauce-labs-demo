import {
  DataTestComponent,
  OptionComponent,
  TextComponent,
  TitleComponent,
} from '../../framework/components'
import {
  ProductSortOption,
  ProductSortOptions,
} from '../resources/product-sort-options'
import { BaseComponent } from './base-component'

export class SwagLabsSecondaryHeaderComponent extends BaseComponent {
  private get container(): DataTestComponent {
    return new DataTestComponent(this.root, 'secondary-header')
  }

  private get productSort(): DataTestComponent {
    return new DataTestComponent(this.container, 'product-sort-container')
  }

  get productsTitle(): TitleComponent {
    return new TitleComponent(this.container, 'Products')
  }

  activeOption(text: ProductSortOption): TextComponent {
    return new TextComponent(
      new DataTestComponent(this.container, 'active-option'),
      text,
    )
  }

  get nameAtoZ(): OptionComponent {
    return this.option(ProductSortOptions.NameAtoZ)
  }

  get nameZtoA(): OptionComponent {
    return this.option(ProductSortOptions.NameZtoA)
  }

  get priceLowToHigh(): OptionComponent {
    return this.option(ProductSortOptions.PriceLowToHigh)
  }

  get priceHighToLow(): OptionComponent {
    return this.option(ProductSortOptions.PriceHighToLow)
  }

  private option(name: ProductSortOption): OptionComponent {
    return new OptionComponent(this.productSort, name, { exact: true })
  }
}
