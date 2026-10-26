import { expect, type Page } from '@playwright/test'

export abstract class BaseWebPage {
  protected abstract readonly path: string

  constructor(protected readonly page: Page) {}

  async goto(): Promise<void> {
    await this.page.goto(this.path)
  }

  /** Checks the URL once, right now, without waiting. Use `expectCurrentPage` after navigation. */
  isCurrentPage(): boolean {
    const currentUrl = new URL(this.page.url())
    const targetUrl = new URL(this.path, currentUrl)

    return (
      currentUrl.pathname === targetUrl.pathname &&
      currentUrl.search === targetUrl.search &&
      currentUrl.hash === targetUrl.hash
    )
  }

  /** Asserts the URL matches the page path, retrying until the assertion timeout. */
  expectCurrentPage(): Promise<void> {
    const targetUrl = new URL(this.path, this.page.url())

    return expect(this.page).toHaveURL(
      (currentUrl) =>
        currentUrl.pathname === targetUrl.pathname &&
        currentUrl.search === targetUrl.search &&
        currentUrl.hash === targetUrl.hash,
    )
  }
}
