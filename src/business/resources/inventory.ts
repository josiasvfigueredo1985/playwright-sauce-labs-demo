export const ProductNames = {
  sauceLabsBackpack: 'Sauce Labs Backpack',
  sauceLabsBikeLight: 'Sauce Labs Bike Light',
  sauceLabsBoltTShirt: 'Sauce Labs Bolt T-Shirt',
  sauceLabsFleeceJacket: 'Sauce Labs Fleece Jacket',
  sauceLabsOnesie: 'Sauce Labs Onesie',
  testAllTheThingsTShirtRed: 'Test.allTheThings() T-Shirt (Red)',
} as const

export const ProductCardOptions = {
  AddToCart: 'Add to cart',
  viewDetailsLabel: (productName: string) => `View details for ${productName}`,
} as const

export const ProductSortOptions = {
  NameAtoZ: 'Name (A to Z)',
  NameZtoA: 'Name (Z to A)',
  PriceLowToHigh: 'Price (low to high)',
  PriceHighToLow: 'Price (high to low)',
} as const

export type ProductSortOption =
  (typeof ProductSortOptions)[keyof typeof ProductSortOptions]

export const SecondaryHeaderOptions = {
  Products: 'Products',
} as const

export const MenuCategories = {
  accessories: 'Accessories/accessories-cat',
} as const
