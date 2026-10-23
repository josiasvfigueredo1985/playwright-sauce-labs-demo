export const ProductSortOptions = {
  NameAtoZ: 'Name (A to Z)',
  NameZtoA: 'Name (Z to A)',
  PriceLowToHigh: 'Price (low to high)',
  PriceHighToLow: 'Price (high to low)',
} as const

export type ProductSortOption =
  (typeof ProductSortOptions)[keyof typeof ProductSortOptions]
