import type { Locator, Page } from "@playwright/test";

export type LocatorParent = Page | Locator;
export type RoleOptions = Parameters<Page["getByRole"]>[1];
