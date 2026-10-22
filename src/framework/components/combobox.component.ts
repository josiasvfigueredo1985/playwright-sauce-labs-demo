import { BaseLocatorComponent } from "../bases/base-locator.component";
import type {
  LocatorOptions,
  LocatorParent,
  RoleQueryOptions,
} from "../types/locator.types";
import { resolveLocator } from "../resolvers/locator.resolver";

export class ComboBoxComponent extends BaseLocatorComponent {
  constructor(parent: LocatorParent, options?: LocatorOptions<RoleQueryOptions>) {
    const { and, childLocator, filter, position, within, ...queryOptions } =
      options ?? {};

    super(
      resolveLocator(
        parent,
        (root) => root.getByRole("combobox", queryOptions),
        { and, childLocator, filter, position, within },
      ),
    );
  }

  selectOption(value: string): Promise<string[]> {
    return this.locator.selectOption(value);
  }
}
