import { BaseLocatorComponent, type LocatorParent, type RoleOptions } from "../bases/base-locator.component";

export class ComboBoxComponent extends BaseLocatorComponent {
  constructor(parent: LocatorParent, options?: RoleOptions) {
    super(parent.getByRole("combobox", options));
  }

  selectOption(value: string): Promise<string[]> {
    return this.locator.selectOption(value);
  }
}
