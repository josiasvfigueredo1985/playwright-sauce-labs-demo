import type { Page } from '@playwright/test';
import type { IRoutablePage } from '../../framework/interfaces/i-routable-page';

export class InventoryPage implements IRoutablePage {
  readonly path = '/inventory.html';

  constructor(private readonly page: Page) {}

  get heading() {
    return this.page.getByText('Products', { exact: true });
  }
}
