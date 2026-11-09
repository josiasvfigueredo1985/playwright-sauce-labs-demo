import { expect, type Locator } from '@playwright/test'
import { UiErrorGuard } from './ui-error-guard.utils'

export type AssertionOptions = { timeout?: number }

export class LocatorAssertionUtils {
  constructor(
    private readonly locator: Locator,
    private readonly negated = false,
  ) {}

  get not(): LocatorAssertionUtils {
    return new LocatorAssertionUtils(this.locator, !this.negated)
  }

  /** If the assertion fails, a recorded UI error is the real cause, so it is reported instead. */
  private async guarded(assertion: () => Promise<void>): Promise<void> {
    try {
      await assertion()
    } catch (error) {
      UiErrorGuard.of(this.locator.page())?.assertNone()
      throw error
    }
  }

  private get expectation() {
    // The matcher is applied by each public method below.
    // eslint-disable-next-line playwright/valid-expect
    const expectation = expect(this.locator)

    return this.negated ? expectation.not : expectation
  }

  toBeVisible(options?: AssertionOptions): Promise<void> {
    return this.guarded(() => this.expectation.toBeVisible(options))
  }

  toBeHidden(options?: AssertionOptions): Promise<void> {
    return this.guarded(() => this.expectation.toBeHidden(options))
  }

  toBeEnabled(options?: AssertionOptions): Promise<void> {
    return this.guarded(() => this.expectation.toBeEnabled(options))
  }

  toBeDisabled(options?: AssertionOptions): Promise<void> {
    return this.guarded(() => this.expectation.toBeDisabled(options))
  }

  toBeFocused(options?: AssertionOptions): Promise<void> {
    return this.guarded(() => this.expectation.toBeFocused(options))
  }

  toHaveCount(count: number, options?: AssertionOptions): Promise<void> {
    return this.guarded(() => this.expectation.toHaveCount(count, options))
  }

  toHaveText(text: string | RegExp, options?: AssertionOptions): Promise<void> {
    return this.guarded(() => this.expectation.toHaveText(text, options))
  }

  toContainText(
    text: string | RegExp,
    options?: AssertionOptions,
  ): Promise<void> {
    return this.guarded(() => this.expectation.toContainText(text, options))
  }

  toHaveValue(
    value: string | RegExp,
    options?: AssertionOptions,
  ): Promise<void> {
    return this.guarded(() => this.expectation.toHaveValue(value, options))
  }

  toHaveClass(
    value: string | RegExp,
    options?: AssertionOptions,
  ): Promise<void> {
    return this.guarded(() => this.expectation.toHaveClass(value, options))
  }

  toHaveAttribute(
    name: string,
    value: string | RegExp,
    options?: AssertionOptions,
  ): Promise<void> {
    return this.guarded(() =>
      this.expectation.toHaveAttribute(name, value, options),
    )
  }
}
