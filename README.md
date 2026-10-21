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
