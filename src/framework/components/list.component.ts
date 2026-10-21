import type { Locator } from "@playwright/test";
import { BaseLocatorComponent } from "../bases/base-locator.component";
import type { LocatorParent, RoleOptions } from "../types/locator.types";

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
