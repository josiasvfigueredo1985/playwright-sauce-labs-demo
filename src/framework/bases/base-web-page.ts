import type { Page } from "@playwright/test";
import type { IUrlActions } from "../interfaces/i-url-actions";
import type { IRoutablePage } from "../interfaces/i-routable-page";

export abstract class BaseWebPage implements IRoutablePage {
  abstract readonly path: string;

  constructor(
    protected readonly page: Page,
    private readonly url: IUrlActions,
  ) {}

  goto(): Promise<void> {
    return this.url.goto(this);
  }

  isCurrentPage(): boolean {
    return this.url.isAt(this);
  }

  expectCurrentPage(): Promise<void> {
    return this.url.expect(this);
  }
}
