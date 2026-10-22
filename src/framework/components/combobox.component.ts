import { BaseLocatorComponent } from "../bases/base-locator.component";
import type { LocatorParent, RoleOptions } from "../types/locator.types";
import { resolveLocator } from "../resolvers/locator.resolver";

export class ComboBoxComponent extends BaseLocatorComponent {
  constructor(parent: LocatorParent, options?: RoleOptions) {
    super(resolveLocator(parent, (root) => root.getByRole("combobox", options)));
  }

  selectOption(value: string): Promise<string[]> {
    return this.locator.selectOption(value);
  }
}
