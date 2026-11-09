import { createItemMap } from './item.factory'

export interface CategoryEntry {
  readonly name: string
  readonly path: string
}

/** Splits `Name/path?query` on the first `/`. A missing path falls back to `/`. */
function parseEntry(entry: string): CategoryEntry {
  const [, name, path = ''] = /^([^/]+)(?:\/(.*))?$/.exec(entry) ?? []
  if (!name) throw new Error(`Invalid category entry "${entry}"`)
  return { name, path: `/${path}` }
}

/**
 * Builds one category page per key of `items`. Each value is `'Name/path'`:
 * the text before the first `/` is the category name, the rest is the url
 * (path and/or query). Without a url, the page points to the site root (`/`).
 * It is built on `createItemMap`, so pages are lazy and uncached, and unknown
 * keys return `undefined`.
 *
 * @example
 * const MenuCategories = { accessories: 'Accessories/accessories-cat' } as const
 * const categories = createCategoryMap(
 *   MenuCategories,
 *   (entry) => new CategoryPage(page, entry), // entry: { name, path }
 * )
 * await categories.accessories.goto() // opens /accessories-cat
 */
export function createCategoryMap<
  TItems extends Readonly<Record<string, string>>,
  TPage,
>(items: TItems, mold: (entry: CategoryEntry) => TPage) {
  return createItemMap(items, (item) => mold(parseEntry(item)))
}
