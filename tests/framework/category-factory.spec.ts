import { expect, test } from '@playwright/test'
import { createCategoryMap } from '../../src/framework/factories/category.factory'

const pages = createCategoryMap(
  {
    withQuery: 'Backpack/inventory-item.html?id=4',
    withPath: 'Accessories/accessories-cat',
    withoutUrl: 'Sport Glasses',
  } as const,
  (entry) => entry,
)

test.describe('createCategoryMap', () => {
  test('splits name and path with a query', () => {
    expect(pages.withQuery).toEqual({
      name: 'Backpack',
      path: '/inventory-item.html?id=4',
    })
  })

  test('splits name and path', () => {
    expect(pages.withPath).toEqual({
      name: 'Accessories',
      path: '/accessories-cat',
    })
  })

  test('falls back to the site root when there is no url', () => {
    expect(pages.withoutUrl).toEqual({ name: 'Sport Glasses', path: '/' })
  })

  test('throws on an entry without a name', () => {
    const invalid = createCategoryMap({ bad: '/path' }, (entry) => entry)

    expect(() => invalid.bad).toThrow('Invalid category entry')
  })
})
