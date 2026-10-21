import type { Locator, Page } from "@playwright/test";
import { BaseLocatorComponent } from "../bases/base-locator.component";

type LocatorParent = Page | Locator;
type PlaceholderOptions = Parameters<Page["getByPlaceholder"]>[1];

export class TextBoxComponent extends BaseLocatorComponent {
  constructor(
    parent: LocatorParent,
    placeholder: string | RegExp,
    options?: PlaceholderOptions,
  ) {
    super(parent.getByPlaceholder(placeholder, options));
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
