import type { Locator } from "@playwright/test";
import { BaseLocatorComponent } from "../bases/base-locator.component";
import type { LocatorParent, RoleOptions } from "../types/locator.types";

export class TableComponent extends BaseLocatorComponent {
  constructor(parent: LocatorParent, options?: RoleOptions) {
    super(parent.getByRole("table", options));
  }

  rowContaining(text: string | RegExp): Locator {
    return this.locator.getByRole("row").filter({ hasText: text });
  }

  rows(): Promise<Locator[]> {
    return this.locator.getByRole("row").all();
  }

  cellNamed(name: string | RegExp): Locator {
    return this.locator.getByRole("cell", { name });
  }
}
