import { expect, test } from '@playwright/test'
import { UiErrorGuard } from '../../src/framework/utils/ui-error-guard.utils'
import { LocatorAssertionUtils } from '../../src/framework/utils/locator-assertion.utils'

test.describe('UiErrorGuard', () => {
  test('records matching page errors and console errors, then asserts', async ({
    page,
  }) => {
    const guard = UiErrorGuard.attach(page, [/boom/, 'broken widget'])
    await page.goto('about:blank')

    await page.evaluate(() => {
      setTimeout(() => {
        throw new Error('boom')
      }, 0)
      console.error('broken widget failed')
    })
    await expect.poll(() => guard.errors.length).toBe(2)

    expect(() => guard.assertNone()).toThrow(/UI errors detected/)
  })

  test('a failing assertion reports the UI error as the cause', async ({
    page,
  }) => {
    const guard = UiErrorGuard.attach(page, [/boom/])
    await page.goto('about:blank')
    await page.evaluate(() => console.error('boom'))
    await expect.poll(() => guard.errors.length).toBe(1)

    const missing = new LocatorAssertionUtils(page.locator('#missing'))
    await expect(missing.toBeVisible({ timeout: 300 })).rejects.toThrow(
      /UI errors detected/,
    )
  })

  test('ignores errors that do not match', async ({ page }) => {
    const guard = UiErrorGuard.attach(page, [/boom/])
    await page.goto('about:blank')

    await page.evaluate(() => console.error('harmless'))
    await page.evaluate(() => console.log('boom in a log is not an error'))

    expect(guard.errors).toHaveLength(0)
    expect(() => guard.assertNone()).not.toThrow()
  })
})
