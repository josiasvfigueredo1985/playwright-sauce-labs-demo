import type { LocatorParent } from "../types/locator.types";
import { BaseLocatorComponent } from "../bases/base-locator.component";
import { resolveLocator } from "../resolvers/locator.resolver";

export class ButtonComponent extends BaseLocatorComponent {
  constructor(parent: LocatorParent, name: string | RegExp) {
    super(
      resolveLocator(parent, (root) => root.getByRole("button", { name })),
    );
  }

  isDisabled(): Promise<boolean> {
    return this.locator.isDisabled();
  }

  isEnabled(): Promise<boolean> {
    return this.locator.isEnabled();
  }
}
