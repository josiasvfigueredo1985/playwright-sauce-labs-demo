import type { Page } from '@playwright/test'
import { BaseWebPage } from '../../framework/bases/base-web.page'
import type { CategoryEntry } from '../../framework/factories/category.factory'

export class CategoryPage extends BaseWebPage {
  protected readonly path: string
  protected readonly name: string

  constructor(page: Page, entry: CategoryEntry) {
    super(page)
    this.name = entry.name
    this.path = entry.path
  }

  get categoryName() {
    return this.name
  }

  get categoryPath() {
    return this.path
  }
}
