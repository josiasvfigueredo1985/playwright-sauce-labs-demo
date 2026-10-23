import type { LocatorOptions, LocatorParent } from '../types/locator.types'
import { BaseLocatorComponent } from '../bases/base-locator.component'
import { resolveLocator } from '../resolvers/locator.resolver'

export class LinkComponent extends BaseLocatorComponent {
  constructor(
    parent: LocatorParent,
    name: string | RegExp,
    options?: LocatorOptions,
  ) {
    super(
      resolveLocator(
        parent,
        (root) => root.getByRole('link', { name }),
        options,
      ),
    )
  }
}
