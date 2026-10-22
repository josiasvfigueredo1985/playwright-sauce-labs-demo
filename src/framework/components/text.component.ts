import { expect, type Locator, type Page } from "@playwright/test";
import { BaseLocatorComponent } from "../bases/base-locator.component";
import type { LocatorParent } from "../types/locator.types";
import {
  resolveLocator,
  type LocatorResolutionOptions,
} from "../resolvers/locator.resolver";

type TextOptions = Parameters<Page["getByText"]>[1];
type TextComponentOptions = TextOptions & LocatorResolutionOptions;

export class TextComponent extends BaseLocatorComponent {
  constructor(
    parent: LocatorParent,
    text: string | RegExp,
    options?: TextComponentOptions,
  ) {
    const { childLocator, filter, position, within, ...textOptions } = options ?? {};

    super(
      resolveLocator(
        parent,
        (root) => root.getByText(text, textOptions),
        { childLocator, filter, position, within },
      ),
    );
  }

  getText(): Promise<string> {
    return this.locator.innerText();
  }

  toHaveText(text: string | RegExp): Promise<void> {
    return expect(this.locator).toHaveText(text);
  }
}
