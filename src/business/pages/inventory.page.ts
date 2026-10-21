import type { Page } from '@playwright/test';
import type { IUrlActions } from '../../framework/interfaces/i-url-actions';
import { BaseWebPage } from '../../framework/bases/base-web-page';

export class InventoryPage extends BaseWebPage {
  readonly path = '/inventory.html';

  constructor(
    private readonly page: Page,
    url: IUrlActions,
  ) {
    super(url);
  }

  get heading() {
    return this.page.getByText('Products', { exact: true });
  }
}
