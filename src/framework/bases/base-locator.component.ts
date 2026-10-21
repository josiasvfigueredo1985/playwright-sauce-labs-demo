import { expect, type Locator } from "@playwright/test";

export class BaseLocatorComponent {
  constructor(readonly locator: Locator) {}

  toBeVisible(): Promise<void> {
    return expect(this.locator).toBeVisible();
  }

  toBeHidden(): Promise<void> {
    return expect(this.locator).toBeHidden();
  }
}
