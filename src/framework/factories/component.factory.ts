export type ComponentMap<
  TItems extends Readonly<Record<string, string>>,
  TComponent,
> = { readonly [K in keyof TItems]: TComponent }

// Builds each component on access from the mold, so nothing is cached.
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
