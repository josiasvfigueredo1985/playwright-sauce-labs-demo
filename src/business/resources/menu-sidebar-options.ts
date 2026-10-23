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
