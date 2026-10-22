import type { Locator } from "@playwright/test";
import { BaseLocatorComponent } from "../bases/base-locator.component";
import type { LocatorParent, RoleOptions } from "../types/locator.types";
import { resolveLocator } from "../resolvers/locator.resolver";

export class ListComponent extends BaseLocatorComponent {
  constructor(parent: LocatorParent, options?: RoleOptions) {
    super(resolveLocator(parent, (root) => root.getByRole("list", options)));
  }

  items(): Promise<Locator[]> {
    return resolveLocator(
      this.locator,
      (list) => list.getByRole("listitem"),
    ).all();
  }

  itemContaining(text: string | RegExp): Locator {
    return resolveLocator(
      this.locator,
      (list) => list.getByRole("listitem"),
      { filter: { hasText: text } },
    );
  }
}
