import type { Locator } from "@playwright/test";
import { BaseLocatorComponent, type LocatorParent, type RoleOptions } from "../bases/base-locator.component";

export class ListComponent extends BaseLocatorComponent {
  constructor(parent: LocatorParent, options?: RoleOptions) {
    super(parent.getByRole("list", options));
  }

  items(): Promise<Locator[]> {
    return this.locator.getByRole("listitem").all();
  }

  itemContaining(text: string | RegExp): Locator {
    return this.locator.getByRole("listitem").filter({ hasText: text });
  }
}
