# TODO

Roadmap for the framework. Tick items as they are done.

## Test setup and state

- [ ] `beforeAll` setup
- [ ] Global context: typed, shared run state (globalSetup and fixtures)
- [ ] Cookie and session injection with `storageState`
- [ ] Custom fixtures that provide pages and workflows
- [ ] Test data builders and cleanup through the API
- [ ] Environment config from `.env`, validated at startup

## Guards

- [ ] UI guards: error banners and toasts, fail fast
- [ ] Readiness waiters (maps, spinners) in `LocatorActionUtils` with `expect.poll`
- [ ] Backend guards: fail on 5xx or failed requests during a step
- [ ] Console error guard with an allow-list

## Network and data

- [ ] Mocks with typed `page.route` handlers, plus HAR record and replay
- [ ] Backend data fetchers: typed API client on Playwright `request`
- [ ] JMESPath filtering wrapped in a helper, used with the global context
- [ ] Contract and schema validation of API responses

## Quality coverage

- [ ] Visual regression with Applitools (compare with `toHaveScreenshot`)
- [ ] Accessibility checks with `@axe-core/playwright`
- [ ] Performance budgets and Web Vitals
- [ ] Cross-browser and mobile projects

## Reporting and CI

- [ ] Attach traces, screenshots and API logs on failure; `test.step` in workflows
- [ ] Test tags (`@smoke`, `@regression`) with matching CI jobs
- [ ] Flaky test tracking
- [ ] Pre-commit hooks (husky and lint-staged)
- [ ] Dependabot or Renovate

## Framework itself

- [ ] Framework tests for `LinkComponent`, secondary header and sidebar
- [ ] Extend the magic-string lint rule to local variables and tests
- [ ] Document `viewDetailsLabel` in the README
- [ ] Move add-to-cart steps out of `inventory-sorting.spec.ts` into their own spec
- [ ] Multi-language dictionaries
- [ ] Decide how the spinner e2e test avoids flakiness (it is only briefly visible)
