import type { Locator, Page } from "@playwright/test";

export type LocatorParent = Page | Locator;
export type RoleOptions = Parameters<Page["getByRole"]>[1];

export class BaseLocatorComponent {
  constructor(readonly locator: Locator) {}
}
