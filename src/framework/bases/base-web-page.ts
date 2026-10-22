import {expect, type Page} from '@playwright/test';

export abstract class BaseWebPage {
  protected abstract readonly path: string;

  constructor(protected readonly page: Page) {}

  async goto(): Promise<void> {
    await this.page.goto(this.path);
  }

  isCurrentPage(): boolean {
    const currentUrl = new URL(this.page.url());
    const targetUrl = new URL(this.path, currentUrl);

    return (
      currentUrl.pathname === targetUrl.pathname &&
      currentUrl.search === targetUrl.search &&
      currentUrl.hash === targetUrl.hash
    );
  }

  expectCurrentPage(): Promise<void> {
    const targetUrl = new URL(this.path, this.page.url());

    return expect(this.page).toHaveURL(
        (currentUrl) =>
          currentUrl.pathname === targetUrl.pathname &&
        currentUrl.search === targetUrl.search &&
        currentUrl.hash === targetUrl.hash,
    );
  }
}
