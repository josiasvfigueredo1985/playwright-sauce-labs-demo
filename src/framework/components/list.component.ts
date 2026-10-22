import type {Locator} from '@playwright/test';
import {BaseLocatorComponent} from '../bases/base-locator.component';
import type {
  LocatorOptions,
  LocatorParent,
  RoleQueryOptions,
} from '../types/locator.types';
import {resolveLocator} from '../resolvers/locator.resolver';

export class ListComponent extends BaseLocatorComponent {
  constructor(
      parent: LocatorParent,
      options?: LocatorOptions<RoleQueryOptions>,
  ) {
    const {and, childLocator, filter, position, within, ...queryOptions} =
      options ?? {};

    super(
        resolveLocator(
            parent,
            (root) => root.getByRole('list', queryOptions),
            {and, childLocator, filter, position, within},
        ),
    );
  }

  items(): Promise<Locator[]> {
    return resolveLocator(
        this.locator,
        (list) => list.getByRole('listitem'),
    ).all();
  }

  itemContaining(text: string | RegExp): Locator {
    return resolveLocator(
        this.locator,
        (list) => list.getByRole('listitem'),
        {filter: {hasText: text}},
    );
  }
}
