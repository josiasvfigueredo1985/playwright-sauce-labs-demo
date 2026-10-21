import type { LocatorParent } from "../types/locator.types";
import { BaseLocatorComponent } from "../bases/base-locator.component";

export class ButtonComponent extends BaseLocatorComponent {
  constructor(parent: LocatorParent, name: string | RegExp) {
    super(parent.getByRole("button", { name }));
  }

  click(): Promise<void> {
    return this.locator.click();
  }

  isEnabled(): Promise<boolean> {
    return this.locator.isEnabled();
  }
}
