export const MainHeaderOptions = {
  Logo: 'Swag Labs',
  OpenMenu: 'Open Menu',
  CartEmpty: /^Cart, empty$/,
  CartWithItems: /^Cart, (\d+ items)$/,
} as const

export const MenuSidebarOptions = {
  AllItems: 'All Items',
  DynamicCatalog: 'Dynamic Catalog',
  About: 'About',
  Logout: 'Logout',
  ResetAppState: 'Reset App State',
  CloseMenu: 'Close Menu',
  LazyLoad: 'Lazy Load',
  Spinner: 'Spinner',
  Slider: 'Slider',
} as const

export type MenuSidebarOption =
  (typeof MenuSidebarOptions)[keyof typeof MenuSidebarOptions]

export const DynamicCatalogSpinnerOptions = {
  Loading: 'Loading',
} as const
