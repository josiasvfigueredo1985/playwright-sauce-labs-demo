import { BaseWebPage } from '../../framework/bases/base-web-page';
import { HeaderContainerComponent } from '../components/header-container.component';
import { DataTestComponent } from '../../framework/components/data-test.component';

export class InventoryPage extends BaseWebPage {
  protected readonly path = '/inventory.html';
  private headerContainerComponent?: HeaderContainerComponent;

  get headerContainer(): HeaderContainerComponent {
    return (this.headerContainerComponent ??= new HeaderContainerComponent(
      new DataTestComponent(this.page, 'header-container').locator,
    ));
  }
}
