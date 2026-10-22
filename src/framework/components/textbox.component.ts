import { BaseLocatorComponent } from "../bases/base-locator.component";
import type {
  LocatorOptions,
  LocatorParent,
  PlaceholderQueryOptions,
} from "../types/locator.types";
import { resolveLocator } from "../resolvers/locator.resolver";

export class TextBoxComponent extends BaseLocatorComponent {
  constructor(
    parent: LocatorParent,
    placeholder: string | RegExp,
    options?: LocatorOptions<PlaceholderQueryOptions>,
  ) {
    const { and, childLocator, filter, position, within, ...queryOptions } =
      options ?? {};

    super(
      resolveLocator(
        parent,
        (root) => root.getByPlaceholder(placeholder, queryOptions),
        { and, childLocator, filter, position, within },
      ),
    );
  }

  fill(value: string): Promise<void> {
    return this.locator.fill(value);
  }

  clear(): Promise<void> {
    return this.locator.clear();
  }

  getValue(): Promise<string> {
    return this.locator.inputValue();
  }
}
