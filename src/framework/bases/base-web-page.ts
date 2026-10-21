import type { IUrlActions } from "../interfaces/i-url-actions";
import type { IRoutablePage } from "../interfaces/i-routable-page";

export abstract class BaseWebPage implements IRoutablePage {
  abstract readonly path: string;

  protected constructor(private readonly url: IUrlActions) {}

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
