import { expect, test } from '@playwright/test'
import { ApiTracker } from '../../src/framework/utils/api-tracker.utils'

const delayed =
  (ms: number) => async (route: import('@playwright/test').Route) => {
    await new Promise((resolve) => setTimeout(resolve, ms))
    await route.fulfill({ status: 500, body: '{}' })
  }

test.describe('ApiTracker', () => {
  test('waits for REST, GraphQL and Google calls started before the wait, ignoring status', async ({
    page,
  }) => {
    await page.route('https://example.test/**', delayed(300))
    await page.route('https://maps.googleapis.com/**', delayed(300))
    await page.goto('about:blank')
    const tracker = ApiTracker.attach(page)

    await page.evaluate(() => {
      void fetch('https://example.test/rest').catch(() => undefined)
      void fetch('https://example.test/graphql', { method: 'POST' }).catch(
        () => undefined,
      )
      void fetch('https://maps.googleapis.com/maps/api/js').catch(
        () => undefined,
      )
    })

    const start = Date.now()
    await tracker.waitForIdle()
    expect(Date.now() - start).toBeGreaterThanOrEqual(250)
  })

  test('returns silently at the timeout when a call never resolves', async ({
    page,
  }) => {
    await page.route(
      'https://example.test/**',
      () => new Promise(() => undefined),
    )
    await page.goto('about:blank')
    const tracker = ApiTracker.attach(page)

    await Promise.all([
      page.waitForRequest('https://example.test/hang'),
      page.evaluate(() => {
        void fetch('https://example.test/hang').catch(() => undefined)
      }),
    ])

    const start = Date.now()
    await tracker.waitForIdle(500)
    expect(Date.now() - start).toBeGreaterThanOrEqual(450)
  })

  test('resolves immediately when nothing is pending', async ({ page }) => {
    await page.goto('about:blank')
    await ApiTracker.attach(page).waitForIdle()
  })
})
