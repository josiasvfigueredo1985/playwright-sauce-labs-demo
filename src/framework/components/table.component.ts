import type {Locator} from '@playwright/test';
import {BaseLocatorComponent} from '../bases/base-locator.component';
import type {
  LocatorOptions,
  LocatorParent,
  RoleQueryOptions,
} from '../types/locator.types';
import {resolveLocator} from '../resolvers/locator.resolver';

export class TableComponent extends BaseLocatorComponent {
  constructor(
      parent: LocatorParent,
      options?: LocatorOptions<RoleQueryOptions>,
  ) {
    const {and, childLocator, filter, position, within, ...queryOptions} =
      options ?? {};

    super(
        resolveLocator(
            parent,
            (root) => root.getByRole('table', queryOptions),
            {and, childLocator, filter, position, within},
        ),
    );
  }

  rowContaining(text: string | RegExp): Locator {
    return resolveLocator(
        this.locator,
        (table) => table.getByRole('row'),
        {filter: {hasText: text}},
    );
  }

  rows(): Promise<Locator[]> {
    return resolveLocator(
        this.locator,
        (table) => table.getByRole('row'),
    ).all();
  }

  cellNamed(name: string | RegExp): Locator {
    return resolveLocator(
        this.locator,
        (table) => table.getByRole('cell', {name}),
    );
  }
}
