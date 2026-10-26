import type { LocatorOptions, LocatorParent } from '../types/locator.types'
import { BaseLocatorComponent } from '../bases/base-locator.component'
import { resolveLocator } from '../resolvers/locator.resolver'

/** Element with the `status` role. Unlike other components, `name` is optional. */
export class StatusComponent extends BaseLocatorComponent {
  constructor(
    parent: LocatorParent,
    name?: string | RegExp,
    options?: LocatorOptions,
  ) {
    super(
      resolveLocator(
        parent,
        (root) => root.getByRole('status', { name }),
        options,
      ),
    )
  }
}
