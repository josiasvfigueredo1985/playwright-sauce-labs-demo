import type { Page } from "@playwright/test";
import { BaseLocatorComponent } from "../bases/base-locator.component";
import type { LocatorParent } from "../types/locator.types";
import { resolveLocator } from "../resolvers/locator.resolver";

type PlaceholderOptions = Parameters<Page["getByPlaceholder"]>[1];

export class TextBoxComponent extends BaseLocatorComponent {
  constructor(
    parent: LocatorParent,
    placeholder: string | RegExp,
    options?: PlaceholderOptions,
  ) {
    super(
      resolveLocator(parent, (root) =>
        root.getByPlaceholder(placeholder, options),
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
