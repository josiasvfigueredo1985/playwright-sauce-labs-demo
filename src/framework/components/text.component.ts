import { expect, type Locator, type Page } from "@playwright/test";
import { BaseLocatorComponent } from "../bases/base-locator.component";
import type { LocatorParent } from "../types/locator.types";

type TextOptions = Parameters<Page["getByText"]>[1];

export class TextComponent extends BaseLocatorComponent {
  constructor(
    parent: LocatorParent,
    text: string | RegExp,
    options?: TextOptions,
  ) {
    super(parent.getByText(text, options));
  }

  getText(): Promise<string> {
    return this.locator.innerText();
  }

  toHaveText(text: string | RegExp): Promise<void> {
    return expect(this.locator).toHaveText(text);
  }
}
