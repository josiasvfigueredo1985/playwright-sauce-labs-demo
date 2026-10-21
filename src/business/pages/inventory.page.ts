import { BaseWebPage } from '../../framework/bases/base-web-page';
import { TextComponent } from '../../framework/components/text.component';

export class InventoryPage extends BaseWebPage {
  readonly path = '/inventory.html';
  private headingComponent?: TextComponent;

  get heading(): TextComponent {
    return (this.headingComponent ??= new TextComponent(
      this.page,
      'Products',
      { exact: true },
    ));
  }
}
