import type { Locator, Page } from '@playwright/test'
import type { BaseLocatorComponent } from '../bases/base-locator.component'
import { LocatorPosition } from '../constants/locator-position.constants'

export type LocatorSource = Locator | BaseLocatorComponent
export type LocatorParent = Page | LocatorSource
export type RoleQueryOptions = NonNullable<Parameters<Page['getByRole']>[1]>
export type TextQueryOptions = NonNullable<Parameters<Page['getByText']>[1]>
export type TitleQueryOptions = NonNullable<Parameters<Page['getByTitle']>[1]>
export type PlaceholderQueryOptions = NonNullable<
  Parameters<Page['getByPlaceholder']>[1]
>
export type LocatorFilterOptions = Omit<
  NonNullable<Parameters<Locator['filter']>[0]>,
  'has' | 'hasNot'
> & {
  has?: LocatorSource
  hasNot?: LocatorSource
}
export type LocatorResolver = (locator: Locator) => LocatorSource
export type InitialLocatorResolver = (parent: Page | Locator) => Locator

export type LocatorOptions<TQueryOptions extends object = object> =
  TQueryOptions & {
    and?: LocatorSource
    childLocator?: LocatorSource
    filter?: LocatorFilterOptions
    position?:
      | { type: typeof LocatorPosition.First }
      | { type: typeof LocatorPosition.Last }
      | { type: typeof LocatorPosition.Nth; index: number }
    within?: LocatorSource
  }
