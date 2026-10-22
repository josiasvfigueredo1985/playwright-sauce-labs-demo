import { expect, test } from "@playwright/test";
import { ButtonComponent } from "../../src/framework/components/button.component";
import { TextComponent } from "../../src/framework/components/text.component";
import {
  LocatorPosition,
  resolveLocator,
} from "../../src/framework/resolvers/locator.resolver";

test.describe("Locator Resolver", () => {
  test("finds text within a named table", async ({ page }) => {
    await page.setContent(`
    <table>
      <caption>Inventory</caption>
      <tbody>
        <tr><td>Backpack</td><td>In stock</td></tr>
        <tr><td>Bike Light</td><td>Out of stock</td></tr>
      </tbody>
    </table>
  `);

    const inventoryTable = page.getByRole("table", { name: "Inventory" });
    const backpackText = resolveLocator(
      page,
      (root) => root.getByText("Backpack", { exact: true }),
      { within: inventoryTable },
    );

    await expect(backpackText).toHaveCount(1);
  });

  test("filters rows using related text before locating another cell", async ({
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
  `);

    const inventoryTable = page.getByRole("table", { name: "Inventory" });
    const stockStatus = resolveLocator(
      inventoryTable,
      (table) => table.getByRole("row"),
      { filter: { has: page.getByText("Backpack") } },
      (row) => row.getByText("In stock", { exact: true }),
    );

    await expect(stockStatus).toHaveCount(1);
  });

  test("scopes a list-item button to the matching product", async ({
    page,
  }) => {
    await page.setContent(`
    <ul>
      <li>Product 1 <button>Add to cart</button></li>
      <li>Product 2 <button onclick="this.textContent = 'Added'">Add to cart</button></li>
    </ul>
  `);

    const addProductTwo = page
      .getByRole("listitem")
      .filter({ hasText: "Product 2" })
      .getByRole("button", { name: "Add to cart" });
    const productTwo = page
      .getByRole("listitem")
      .filter({ hasText: "Product 2" });

    await addProductTwo.click();
    await expect(productTwo).toContainText("Added");
  });

  test("scopes multiple form interactions to the pricing card", async ({
    page,
  }) => {
    await page.setContent(`
    <main data-testid="pricing-cards">
      <section data-testid="premium-plan-card">
        <input placeholder="Enter promo code">
        <button onclick="this.textContent = 'Applied'">Apply</button>
        <label><input type="checkbox"> Accept Terms</label>
      </section>
    </main>
  `);

    const pricingCard = resolveLocator(
      page,
      (root) => root.getByTestId("premium-plan-card"),
      { within: page.getByTestId("pricing-cards") },
    );

    await pricingCard.getByPlaceholder("Enter promo code").fill("SAVE20");
    await pricingCard.getByRole("button", { name: "Apply" }).click();
    await pricingCard.getByRole("checkbox", { name: "Accept Terms" }).check();

    await expect(pricingCard.getByPlaceholder("Enter promo code")).toHaveValue(
      "SAVE20",
    );
    await expect(
      pricingCard.getByRole("button", { name: "Applied" }),
    ).toBeVisible();
    await expect(
      pricingCard.getByRole("checkbox", { name: "Accept Terms" }),
    ).toBeChecked();
  });

  test("locates a labeled field inside the signup form", async ({ page }) => {
    await page.setContent(`
    <form data-testid="signup-form">
      <label for="signup-password">Password</label>
      <input id="signup-password" type="password">
    </form>
    <label for="other-password">Password</label>
    <input id="other-password" type="password">
  `);

    const passwordField = page
      .getByTestId("signup-form")
      .getByLabel("Password");

    await passwordField.fill("SecurePassword123!");

    await expect(passwordField).toHaveValue("SecurePassword123!");
    await expect(page.locator("#other-password")).toHaveValue("");
  });

  test("finds a delete button within the matching table row", async ({
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
  `);

    const johnDoeRow = page.getByRole("row", { name: "John Doe" });
    await johnDoeRow.getByRole("button", { name: "Delete" }).click();

    await expect(johnDoeRow).toHaveCount(0);
    await expect(page.getByRole("row", { name: "Jane Doe" })).toHaveCount(1);
  });

  test("supports exact matching and locator position resolvers", async ({
    page,
  }) => {
    await page.setContent(`
    <p data-position="first">Product</p>
    <p>Products</p>
    <p data-position="last">Product</p>
    <button data-position="first">Choose</button>
    <button data-position="second">Choose</button>
    <button data-position="last">Choose</button>
  `);

    const exactProduct = resolveLocator(page, (root) =>
      root.getByText("Product", { exact: true }),
    );
    const firstProduct = new TextComponent(page, "Product", {
      exact: true,
      filter: { hasText: "Product" },
      position: { type: LocatorPosition.First },
    });
    const firstChoice = resolveLocator(
      page,
      (root) => root.getByRole("button", { name: "Choose" }),
      { position: { type: LocatorPosition.First } },
    );
    const secondChoice = resolveLocator(
      page,
      (root) => root.getByRole("button", { name: "Choose" }),
      { position: { type: LocatorPosition.Nth, index: 1 } },
    );
    const lastChoice = resolveLocator(
      page,
      (root) => root.getByRole("button", { name: "Choose" }),
      { position: { type: LocatorPosition.Last } },
    );

    await expect(exactProduct).toHaveCount(2);
    await expect(firstProduct.locator).toHaveAttribute(
      "data-position",
      "first",
    );
    await expect(firstChoice).toHaveCount(1);
    await expect(secondChoice).toHaveCount(1);
    await expect(lastChoice).toHaveCount(1);
    await expect(firstChoice).toHaveAttribute("data-position", "first");
    await expect(secondChoice).toHaveAttribute("data-position", "second");
    await expect(lastChoice).toHaveAttribute("data-position", "last");
  });

  test("locates a child component relative to matching text", async ({
    page,
  }) => {
    await page.setContent(`
    <div>Products <button aria-label="Edit"></button></div>
    <div>Products</div>
  `);

    const editButton = new TextComponent(page, "Products", {
      exact: true,
      childLocator: new ButtonComponent(page, "Edit").locator,
    });

    await expect(editButton.locator).toHaveCount(1);
    await expect(editButton.locator).toHaveText("Products");
  });
});