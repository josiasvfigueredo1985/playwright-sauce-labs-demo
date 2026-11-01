import { BaseWebPage } from '../../framework/bases/base-web.page'
import { StatusComponent } from '../../framework/components'
import { DynamicCatalogSpinnerOptions } from '../resources/navigation'

export class DynamicCatalogSpinnerPage extends BaseWebPage {
  protected readonly path = '/dynamic-catalog-spinner.html'

  get spinner(): StatusComponent {
    return new StatusComponent(this.page, DynamicCatalogSpinnerOptions.Loading)
  }
}
