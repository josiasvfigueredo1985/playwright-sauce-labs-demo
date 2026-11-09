export type ItemMap<
  TItems extends Readonly<Record<string, string>>,
  TComponent,
> = { readonly [K in keyof TItems]: TComponent }

/**
 * Builds one object per key of `items`, using the item's value as input.
 * Use it when each value is a single string, e.g. a product name.
 *
 * - Objects are built lazily by `mold` on every access (nothing is cached).
 * - Reading a key that is not in `items` returns `undefined`.
 *
 * @example
 * const ProductNames = { backpack: 'Sauce Labs Backpack' } as const
 * const products = createItemMap(
 *   ProductNames,
 *   (name) => new SwagLabsProductCardComponent(page, name),
 * )
 * await products.backpack.addToCart.click()
 */
export function createItemMap<
  TItems extends Readonly<Record<string, string>>,
  TComponent,
>(
  items: TItems,
  mold: (item: string) => TComponent,
): ItemMap<TItems, TComponent> {
  return new Proxy({} as ItemMap<TItems, TComponent>, {
    get: (_target, key) =>
      typeof key === 'string' && key in items ? mold(items[key]) : undefined,
  })
}
