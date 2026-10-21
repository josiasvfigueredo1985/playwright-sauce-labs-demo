import { BaseWebPage } from '../../framework/bases/base-web-page';
import { TextComponent } from '../../framework/components/text.component';

export class InventoryPage extends BaseWebPage {
  readonly path = '/inventory.html';
  private productsTextComponent?: TextComponent;

  get productsText(): TextComponent {
    return (this.productsTextComponent ??= new TextComponent(
      this.page,
      'Products',
      { exact: true },
    ));
  }
}
