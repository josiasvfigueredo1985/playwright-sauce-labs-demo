import type { Page } from '@playwright/test';

export class InventoryPage {
  readonly heading;

  constructor(page: Page) {
    this.heading = page.getByText('Products', { exact: true });
  }
}
