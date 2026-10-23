import { BaseLocatorComponent } from '../bases/base-locator.component'
import type {
  LocatorOptions,
  LocatorParent,
  TitleQueryOptions,
} from '../types/locator.types'
import { resolveLocator } from '../resolvers/locator.resolver'

export class TitleComponent extends BaseLocatorComponent {
  constructor(
    parent: LocatorParent,
    text: string,
    options?: LocatorOptions<TitleQueryOptions>,
  ) {
    const { and, childLocator, filter, position, within, ...queryOptions } =
      options ?? {}

    super(
      resolveLocator(parent, (root) => root.getByTitle(text, queryOptions), {
        and,
        childLocator,
        filter,
        position,
        within,
      }),
    )
  }
}
