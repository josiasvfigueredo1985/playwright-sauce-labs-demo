export type ComponentMap<
  TItems extends Readonly<Record<string, string>>,
  TComponent,
> = { readonly [K in keyof TItems]: TComponent }

/**
 * Maps each key of `items` to a component built by `mold`.
 * Components are built on every access (nothing is cached), and unknown keys
 * return `undefined`. The mold may call another factory to chain components.
 *
 * @example
 * const menuItems = { home: 'Home', cart: 'Cart' } as const
 * const links = createComponentMap(
 *   menuItems,
 *   (name) => new LinkComponent(page, name),
 * )
 * await links.cart.click()
 */
export function createComponentMap<
  TItems extends Readonly<Record<string, string>>,
  TComponent,
>(
  items: TItems,
  mold: (item: string) => TComponent,
): ComponentMap<TItems, TComponent> {
  return new Proxy({} as ComponentMap<TItems, TComponent>, {
    get: (_target, key) =>
      typeof key === 'string' && key in items ? mold(items[key]) : undefined,
  })
}
