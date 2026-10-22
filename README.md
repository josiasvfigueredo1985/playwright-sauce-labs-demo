# Playwright Sauce Labs Demo

## Project structure

```text
playwright.config.ts           # Playwright runner and browser configuration
tests/e2e/                     # Scenarios and assertions for business outcomes
src/
  framework/                   # Reusable, application-agnostic test infrastructure
    fixtures/                  # Shared Playwright test entry point and fixtures
  business/                    # Expandable SauceDemo domain implementation
    components/                # UI components, locators, and UI-level actions
    pages/                     # Page objects composed from components
    resources/                 # Reusable test data and business resources
    workflows/                 # User goals composed from business page objects
```

## Responsibility boundaries

- **Framework (`src/framework`):** Shared Playwright fixtures, utilities, and
  resolvers belong here. Keep this layer application-agnostic; it must not know
  about SauceDemo pages, selectors, or user workflows.
- **Business (`src/business`):** SauceDemo-specific components, pages, user
  workflows, constants, and resources belong here. Components own selectors
  and UI actions; pages compose components; workflows express user goals.
- **Tests (`tests`):** Scenarios compose business workflows with test data and
  assert observable outcomes using the framework's Playwright test entry point.
- **Root tooling:** `playwright.config.ts`, `tsconfig.json`, and `package.json`
  configure the test runner, TypeScript, and project commands.

Run the suite with `npm test`.

GitHub Actions runs the login end-to-end test on pushes and pull requests. The
workflow installs Chromium and uploads Playwright diagnostics when the test
fails.

## Composing locators

Use `resolveLocator` with locator callbacks to compose Playwright locators.
Framework components use the same resolver internally for their root and
nested locators:

```ts
const inventoryTable = page.getByRole("table", { name: "Inventory" });

const backpackText = resolveLocator(
  page,
  (root) => root.getByText("Backpack", { exact: true }),
  { within: inventoryTable },
);

const backpackStockStatus = resolveLocator(
  inventoryTable,
  (table) => table.getByRole("row"),
  { filter: { has: page.getByText("Backpack") } },
  (row) => row.getByText("In stock", { exact: true }),
);

const exactProduct = resolveLocator(
  page,
  (root) => root.getByText("Product", { exact: true }),
);

const secondChooseButton = resolveLocator(
  page,
  (root) => root.getByRole("button", { name: "Choose" }),
  { position: { type: LocatorPosition.Nth, index: 1 } },
);

const productsEditButton = new TextComponent(page, "Products", {
  exact: true,
  childLocator: new ButtonComponent(page, "Edit").locator,
});
```

The resolver options support `within`, Playwright's `filter` options, and a
`position` chosen from the `LocatorPosition` constants (`First`, `Last`, or
`Nth` with an index).
`exact` remains a native option on the initial Playwright query. For example,
`TextComponent` combines the native text options with the resolver options,
including `childLocator`, which filters to text matches containing that locator:

Locator option types and `LocatorPosition` are defined together in
`src/framework/types/locator.types.ts`. Components use the shared generic
`LocatorOptions<TQueryOptions>` to combine their Playwright query options with
the common resolver options.

```ts
new TextComponent(page, "Products", {
  exact: true,
  filter: { hasText: "Products" },
  position: { type: LocatorPosition.First },
});
```

`filter({ has })` selects a container based on related text before locating a
specific descendant. Use `hasText` instead when matching directly on a text
value.

Playwright's `Locator.within()` accepts a parent locator and returns a scoped
locator; it is not an async callback block. Keep a scoped locator and use it for
each interaction:

```ts
const pricingCard = page
  .getByTestId("premium-plan-card")
  .within(page.getByTestId("pricing-cards"));

await pricingCard.getByPlaceholder("Enter promo code").fill("SAVE20");
await pricingCard.getByRole("button", { name: "Apply" }).click();
await pricingCard.getByRole("checkbox", { name: "Accept Terms" }).check();
```

Other supported patterns include chaining a filtered list item to its button,
finding a labeled form field within a form, and locating a button within a
text-matched table row. The framework tests cover each case.
