import { BaseLocatorComponent } from "../bases/base-locator.component";
import type { LocatorParent } from "../types/locator.types";
import { resolveLocator } from "../resolvers/locator.resolver";

export class DataTestComponent extends BaseLocatorComponent {
  constructor(parent: LocatorParent, value: string) {
    super(resolveLocator(parent, (root) => root.getByTestId(value)));
  }
}
