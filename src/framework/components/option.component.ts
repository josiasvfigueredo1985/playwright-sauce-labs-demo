import { BaseLocatorComponent } from '../bases/base-locator.component'
import type {
  LocatorOptions,
  LocatorSource,
  RoleQueryOptions,
} from '../types/locator.types'
import { resolveLocator, toLocator } from '../resolvers/locator.resolver'
import { LocatorActionUtils } from '../utils/locator-action.utils'

export class OptionComponent extends BaseLocatorComponent {
  constructor(
    private readonly select: LocatorSource,
    private readonly name: string,
    options?: LocatorOptions<RoleQueryOptions>,
  ) {
    const { and, childLocator, filter, position, within, ...queryOptions } =
      options ?? {}

    super(
      resolveLocator(
        select,
        (root) => root.getByRole('option', { name, ...queryOptions }),
        { and, childLocator, filter, position, within },
      ),
    )
  }

  // Native options are never clickable, so selecting goes through the parent select.
  async click(): Promise<void> {
    await new LocatorActionUtils(toLocator(this.select)).selectOption({
      label: this.name,
    })
  }
}
