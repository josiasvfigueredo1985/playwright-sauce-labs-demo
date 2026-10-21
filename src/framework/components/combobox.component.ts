import { BaseLocatorComponent } from "../bases/base-locator.component";
import type { LocatorParent, RoleOptions } from "../types/locator.types";

export class ComboBoxComponent extends BaseLocatorComponent {
  constructor(parent: LocatorParent, options?: RoleOptions) {
    super(parent.getByRole("combobox", options));
  }

  selectOption(value: string): Promise<string[]> {
    return this.locator.selectOption(value);
  }
}
