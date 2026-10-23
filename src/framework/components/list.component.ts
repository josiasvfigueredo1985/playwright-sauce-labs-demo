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

  itemContaining(text: string | RegExp): ListItemComponent {
    return new ListItemComponent(this, { filter: { hasText: text } })
  }
}
