import { BaseLocatorComponent } from '../bases/base-locator.component'
import { LocatorPosition } from '../constants/locator-position.constants'
import type {
  LocatorOptions,
  LocatorParent,
  RoleQueryOptions,
} from '../types/locator.types'
import { resolveLocator } from '../resolvers/locator.resolver'
import { CellComponent } from './cell.component'
import { RowComponent } from './row.component'

export class TableComponent extends BaseLocatorComponent {
  constructor(
    parent: LocatorParent,
    options?: LocatorOptions<RoleQueryOptions>,
  ) {
    const { and, childLocator, filter, position, within, ...queryOptions } =
      options ?? {}

    super(
      resolveLocator(parent, (root) => root.getByRole('table', queryOptions), {
        and,
        childLocator,
        filter,
        position,
        within,
      }),
    )
  }

  /** Lazy: matches the row containing `text` each time it is used. */
  rowContaining(text: string | RegExp): RowComponent {
    return new RowComponent(this, { filter: { hasText: text } })
  }

  /**
   * Snapshot of the rows present now, as components pinned to their position.
   * If the table changes afterwards, they may point at different rows.
   */
  async rows(): Promise<RowComponent[]> {
    const count = await resolveLocator(this, (table) =>
      table.getByRole('row'),
    ).count()

    return Array.from(
      { length: count },
      (_, index) =>
        new RowComponent(this, {
          position: { type: LocatorPosition.Nth, index },
        }),
    )
  }

  cellNamed(name: string | RegExp): CellComponent {
    return new CellComponent(this, { name })
  }
}
