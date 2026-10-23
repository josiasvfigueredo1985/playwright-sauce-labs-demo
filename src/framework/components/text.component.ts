import { BaseLocatorComponent } from '../bases/base-locator.component'
import type {
  LocatorOptions,
  LocatorParent,
  TextQueryOptions,
} from '../types/locator.types'
import { resolveLocator } from '../resolvers/locator.resolver'

export class TextComponent extends BaseLocatorComponent {
  constructor(
    parent: LocatorParent,
    text: string | RegExp,
    options?: LocatorOptions<TextQueryOptions>,
  ) {
    const { and, childLocator, filter, position, within, ...textOptions } =
      options ?? {}

    super(
      resolveLocator(parent, (root) => root.getByText(text, textOptions), {
        and,
        childLocator,
        filter,
        position,
        within,
      }),
    )
  }

  getText(): Promise<string> {
    return this.actions.getText()
  }
}
