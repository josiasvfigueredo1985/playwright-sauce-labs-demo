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
/**
 * Options for `Locator.filter()`. All provided conditions must match (AND).
 * `has` and `hasNot` accept a locator or component and are resolved relative
 * to the element being filtered, so never build them from the page root.
 *
 * @example
 * // Rows whose text contains "Menu" AND that contain an "Edit Item" button.
 * // `has` takes any component/locator; it is searched inside each row.
 * const editItemButton = new ButtonComponent(page, 'Edit Item')
 * new RowComponent(page, {
 *   filter: { hasText: 'Menu', has: editItemButton },
 * })
 *
 * @example
 * // Rows that do NOT contain a "Delete" button and do NOT contain "Draft".
 * const deleteButton = new ButtonComponent(page, 'Delete')
 * new RowComponent(page, {
 *   filter: { hasNot: deleteButton, hasNotText: 'Draft' },
 * })
 */
export type LocatorFilterOptions = Omit<
  NonNullable<Parameters<Locator['filter']>[0]>,
  'has' | 'hasNot'
> & {
  has?: LocatorSource
  hasNot?: LocatorSource
}
export type LocatorResolver = (locator: Locator) => LocatorSource
export type InitialLocatorResolver = (parent: Page | Locator) => Locator

/**
 * Options applied in order: within, filter, childLocator, and, position.
 *
 * @example
 * // First row that contains the text "Menu" and an "Edit Item" button.
 * const editItemButton = new ButtonComponent(page, 'Edit Item')
 * new RowComponent(page, {
 *   filter: { hasText: 'Menu', has: editItemButton },
 *   position: { type: LocatorPosition.First },
 * })
 */
export type LocatorOptions<TQueryOptions extends object = object> =
  TQueryOptions & {
    /** Intersects with another locator (`locator.and()`). */
    and?: LocatorSource
    /** Shortcut for `filter: { has }`: keeps elements containing this locator. */
    childLocator?: LocatorSource
    /** Combined `hasText`/`hasNotText`/`has`/`hasNot` filter. */
    filter?: LocatorFilterOptions
    position?:
      | { type: typeof LocatorPosition.First }
      | { type: typeof LocatorPosition.Last }
      | { type: typeof LocatorPosition.Nth; index: number }
    /** Scopes the locator inside another locator or component. */
    within?: LocatorSource
  }
