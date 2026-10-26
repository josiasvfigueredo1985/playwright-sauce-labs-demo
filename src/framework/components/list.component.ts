import { BaseLocatorComponent } from '../bases/base-locator.component'
import { LocatorPosition } from '../constants/locator-position.constants'
import type {
  LocatorOptions,
  LocatorParent,
  RoleQueryOptions,
} from '../types/locator.types'
import { resolveLocator } from '../resolvers/locator.resolver'
import { ListItemComponent } from './list-item.component'

export class ListComponent extends BaseLocatorComponent {
  constructor(
    parent: LocatorParent,
    options?: LocatorOptions<RoleQueryOptions>,
  ) {
    const { and, childLocator, filter, position, within, ...queryOptions } =
      options ?? {}

    super(
      resolveLocator(parent, (root) => root.getByRole('list', queryOptions), {
        and,
        childLocator,
        filter,
        position,
        within,
      }),
    )
  }

  /**
   * Snapshot of the items present now, as components pinned to their position.
   * If the list changes afterwards, they may point at different items.
   */
  async items(): Promise<ListItemComponent[]> {
    const count = await resolveLocator(this, (list) =>
      list.getByRole('listitem'),
    ).count()

    return Array.from(
      { length: count },
      (_, index) =>
        new ListItemComponent(this, {
          position: { type: LocatorPosition.Nth, index },
        }),
    )
  }

  /** Lazy: matches the item containing `text` each time it is used. */
  itemContaining(text: string | RegExp): ListItemComponent {
    return new ListItemComponent(this, { filter: { hasText: text } })
  }
}
