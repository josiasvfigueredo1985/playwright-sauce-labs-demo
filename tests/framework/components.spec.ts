import { test } from '@playwright/test'
import { BaseLocatorComponent } from '../../src/framework/bases/base-locator.component'
import {
  ButtonComponent,
  ComboBoxComponent,
  DataTestComponent,
  ListComponent,
  OptionComponent,
  TableComponent,
  TextBoxComponent,
  TextComponent,
  TitleComponent,
} from '../../src/framework/components'
import { LocatorPosition } from '../../src/framework/constants/locator-position.constants'
import { resolveLocator } from '../../src/framework/resolvers/locator.resolver'

test.describe('Framework locator components and resolver options', () => {
  test.describe('BaseLocatorComponent assertions', () => {
    test('asserts state, class and focus on any component', async ({
      page,
    }) => {
      await page.setContent(`
    <button class="primary">Enabled</button>
    <button disabled>Disabled</button>
    <input placeholder="Search" autofocus>
  `)

      await new ButtonComponent(page, 'Enabled').toBeEnabled()
      await new ButtonComponent(page, 'Enabled').toHaveClass('primary')
      await new ButtonComponent(page, 'Disabled').toBeDisabled()
      await new TextBoxComponent(page, 'Search').toBeFocused()
    })

    test('negates any assertion through not', async ({ page }) => {
      await page.setContent(`
    <button hidden>Hidden</button>
    <input placeholder="Search" value="SAVE20">
  `)

      await new ButtonComponent(page, 'Hidden').not.toBeVisible()
      await new TextBoxComponent(page, 'Search').not.toHaveValue('OTHER')
      await new TextComponent(page, 'Missing').not.toBeVisible()
    })
  })

  test.describe('TitleComponent', () => {
    test('finds an element by its title attribute within a parent', async ({
      page,
    }) => {
      await page.setContent(`
    <header data-test="header"><span title="Products">Products</span></header>
    <span title="Products">Outside</span>
  `)

      const title = new TitleComponent(
        new DataTestComponent(page, 'header'),
        'Products',
      )

      await title.toHaveCount(1)
      await title.toHaveText('Products')
    })
  })

  test.describe('ButtonComponent', () => {
    test('clicks the button matching its accessible name', async ({ page }) => {
      await page.setContent(`
    <button onclick="this.textContent = 'Applied'">Apply</button>
    <button>Cancel</button>
  `)

      await new ButtonComponent(page, 'Apply').click()

      await new ButtonComponent(page, 'Applied').toBeVisible()
    })

    test('selects a button by first, nth and last position', async ({
      page,
    }) => {
      await page.setContent(`
    <button data-position="first">Choose</button>
    <button data-position="second">Choose</button>
    <button data-position="last">Choose</button>
  `)

      const firstChoice = new ButtonComponent(page, 'Choose', {
        position: { type: LocatorPosition.First },
      })
      const secondChoice = new ButtonComponent(page, 'Choose', {
        position: { type: LocatorPosition.Nth, index: 1 },
      })
      const lastChoice = new ButtonComponent(page, 'Choose', {
        position: { type: LocatorPosition.Last },
      })

      await firstChoice.toHaveAttribute('data-position', 'first')
      await secondChoice.toHaveAttribute('data-position', 'second')
      await lastChoice.toHaveAttribute('data-position', 'last')
    })
  })

  test.describe('ComboBoxComponent', () => {
    test('selects an option by value', async ({ page }) => {
      await page.setContent(`
    <select aria-label="Sort products">
      <option value="az">Name (A to Z)</option>
      <option value="lohi">Price (low to high)</option>
    </select>
  `)

      const sort = new ComboBoxComponent(page, { name: 'Sort products' })

      await sort.selectOption('lohi')

      await sort.toHaveValue('lohi')
    })
  })

  test.describe('DataTestComponent', () => {
    test('scopes a component to the matching test id within a parent', async ({
      page,
    }) => {
      await page.setContent(`
    <main data-test="pricing-cards">
      <section data-test="premium-plan-card">
        <input placeholder="Enter promo code">
        <button onclick="this.textContent = 'Applied'">Apply</button>
      </section>
    </main>
    <section data-test="premium-plan-card">Outside</section>
  `)

      const pricingCards = new DataTestComponent(page, 'pricing-cards')
      const pricingCard = new DataTestComponent(page, 'premium-plan-card', {
        within: pricingCards,
      })

      await pricingCard.toHaveCount(1)
      await new TextBoxComponent(pricingCard, 'Enter promo code').fill('SAVE20')
      await new ButtonComponent(pricingCard, 'Apply').click()
      await new ButtonComponent(pricingCard, 'Applied').toBeVisible()
    })

    test('resolves a labeled field inside the matching container', async ({
      page,
    }) => {
      await page.setContent(`
    <form data-test="signup-form">
      <label for="signup-password">Password</label>
      <input id="signup-password" type="password">
    </form>
    <label for="other-password">Password</label>
    <input id="other-password" type="password">
  `)

      const signupForm = new DataTestComponent(page, 'signup-form')
      const passwordField = new BaseLocatorComponent(
        resolveLocator(signupForm, (form) => form.getByLabel('Password')),
      )

      await passwordField.toHaveCount(1)
      await passwordField.toHaveAttribute('id', 'signup-password')
    })
  })

  test.describe('ListComponent', () => {
    test('scopes a button to the list item containing the text', async ({
      page,
    }) => {
      await page.setContent(`
    <ul>
      <li>Product 1 <button>Add to cart</button></li>
      <li>Product 2
        <button onclick="this.textContent = 'Added'">Add to cart</button>
      </li>
    </ul>
  `)

      const productTwo = new ListComponent(page).itemContaining('Product 2')

      await new ButtonComponent(productTwo, 'Add to cart').click()

      await productTwo.toContainText('Added')
    })

    test('lists every item as a component', async ({ page }) => {
      await page.setContent(`
    <ul>
      <li>Product 1</li>
      <li>Product 2</li>
      <li>Product 3</li>
    </ul>
  `)

      const items = await new ListComponent(page).items()

      await items[0].toHaveText('Product 1')
      await items[2].toHaveText('Product 3')
    })
  })

  test.describe('OptionComponent', () => {
    test('selects the option in its parent select when clicked', async ({
      page,
    }) => {
      await page.setContent(`
    <span data-test="active-option">Price (high to low)</span>
    <select aria-label="Sort products" data-test="product-sort-container"
      onchange="document.querySelector('[data-test=active-option]').textContent = this.selectedOptions[0].text">
      <option value="az">Name (A to Z)</option>
      <option value="za">Name (Z to A)</option>
      <option value="hilo" selected>Price (high to low)</option>
    </select>
  `)

      const sort = new DataTestComponent(page, 'product-sort-container')
      const nameAtoZ = new OptionComponent(sort, 'Name (A to Z)', {
        exact: true,
      })

      await nameAtoZ.click()

      await sort.toHaveValue('az')
      await new TextComponent(page, 'Name (A to Z)', {
        filter: { hasText: 'Name (A to Z)' },
        within: new DataTestComponent(page, 'active-option'),
      }).toBeVisible()
    })
  })

  test.describe('TableComponent', () => {
    test('finds the row containing the text and acts within it', async ({
      page,
    }) => {
      await page.setContent(`
    <table>
      <tbody>
        <tr>
          <td>John Doe</td>
          <td><button onclick="this.closest('tr').remove()">Delete</button></td>
        </tr>
        <tr><td>Jane Doe</td><td><button>Delete</button></td></tr>
      </tbody>
    </table>
  `)

      const users = new TableComponent(page)
      const johnDoeRow = users.rowContaining('John Doe')

      await new ButtonComponent(johnDoeRow, 'Delete').click()

      await johnDoeRow.toHaveCount(0)
      await users.rowContaining('Jane Doe').toHaveCount(1)
    })

    test('lists rows and finds a cell by its name', async ({ page }) => {
      await page.setContent(`
    <table>
      <tbody>
        <tr><td>Backpack</td><td>In stock</td></tr>
        <tr><td>Bike Light</td><td>Out of stock</td></tr>
      </tbody>
    </table>
  `)

      const inventory = new TableComponent(page)
      const rows = await inventory.rows()

      await rows[1].toContainText('Bike Light')
      await inventory.cellNamed('Out of stock').toBeVisible()
    })

    test('filters rows by related text before locating another cell', async ({
      page,
    }) => {
      await page.setContent(`
    <table>
      <caption>Inventory</caption>
      <tbody>
        <tr><td>Backpack</td><td>In stock</td></tr>
        <tr><td>Bike Light</td><td>Out of stock</td></tr>
      </tbody>
    </table>
  `)

      const inventoryTable = new TableComponent(page, { name: 'Inventory' })
      const stockStatus = new BaseLocatorComponent(
        resolveLocator(
          inventoryTable,
          (table) => table.getByRole('row'),
          { filter: { has: new TextComponent(page, 'Backpack') } },
          (row) => new TextComponent(row, 'In stock', { exact: true }),
        ),
      )

      await stockStatus.toHaveCount(1)
    })
  })

  test.describe('TextBoxComponent', () => {
    test('fills, reads and clears the box matching its placeholder', async ({
      page,
    }) => {
      await page.setContent(`
    <input placeholder="Enter promo code">
    <input placeholder="Enter email">
  `)

      const promoCode = new TextBoxComponent(page, 'Enter promo code')
      const email = new TextBoxComponent(page, 'Enter email')

      await promoCode.fill('SAVE20')

      await promoCode.toHaveValue('SAVE20')
      await email.toHaveValue('')

      await promoCode.clear()

      await promoCode.toHaveValue('')
    })
  })

  test.describe('TextComponent', () => {
    test('finds text within a named table', async ({ page }) => {
      await page.setContent(`
    <table>
      <caption>Inventory</caption>
      <tbody>
        <tr><td>Backpack</td><td>In stock</td></tr>
      </tbody>
    </table>
    <p>Backpack</p>
  `)

      const inventoryTable = new TableComponent(page, { name: 'Inventory' })
      const backpackText = new TextComponent(page, 'Backpack', {
        exact: true,
        within: inventoryTable,
      })

      await backpackText.toHaveCount(1)
    })

    test('matches exact text and supports positions', async ({ page }) => {
      await page.setContent(`
    <p data-position="first">Product</p>
    <p>Products</p>
    <p data-position="last">Product</p>
  `)

      const exactProduct = new TextComponent(page, 'Product', { exact: true })
      const firstProduct = new TextComponent(page, 'Product', {
        exact: true,
        position: { type: LocatorPosition.First },
      })
      const lastProduct = new TextComponent(page, 'Product', {
        exact: true,
        position: { type: LocatorPosition.Last },
      })

      await exactProduct.toHaveCount(2)
      await firstProduct.toHaveAttribute('data-position', 'first')
      await lastProduct.toHaveAttribute('data-position', 'last')
    })

    test('locates text relative to a child component', async ({ page }) => {
      await page.setContent(`
    <div>Products <button aria-label="Edit"></button></div>
    <div>Products</div>
  `)

      const editableProducts = new TextComponent(page, 'Products', {
        exact: true,
        childLocator: new ButtonComponent(page, 'Edit'),
      })

      await editableProducts.toHaveCount(1)
      await editableProducts.toHaveText('Products')
    })
  })
})
