import type {Locator, Page} from '@playwright/test';
import {LocatorPosition} from '../constants/locator-position.constants';

export type LocatorParent = Page | Locator;
export type RoleQueryOptions = NonNullable<Parameters<Page['getByRole']>[1]>;
export type TextQueryOptions = NonNullable<Parameters<Page['getByText']>[1]>;
export type PlaceholderQueryOptions = NonNullable<
  Parameters<Page['getByPlaceholder']>[1]
>;
export type LocatorFilterOptions = NonNullable<
  Parameters<Locator['filter']>[0]
>;
export type LocatorResolver = (locator: Locator) => Locator;
export type InitialLocatorResolver = (parent: LocatorParent) => Locator;

export type LocatorOptions<TQueryOptions extends object = object> =
  TQueryOptions & {
    and?: Locator;
    childLocator?: Locator;
    filter?: LocatorFilterOptions;
    position?:
      | { type: typeof LocatorPosition.First }
      | { type: typeof LocatorPosition.Last }
      | { type: typeof LocatorPosition.Nth; index: number };
    within?: Locator;
  };
