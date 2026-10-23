import { expect, type Locator } from '@playwright/test'

export type AssertionOptions = { timeout?: number }

export class LocatorAssertionUtils {
  constructor(
    private readonly locator: Locator,
    private readonly negated = false,
  ) {}

  get not(): LocatorAssertionUtils {
    return new LocatorAssertionUtils(this.locator, !this.negated)
  }

  private get expectation() {
    // The matcher is applied by each public method below.
    // eslint-disable-next-line playwright/valid-expect
    const expectation = expect(this.locator)

    return this.negated ? expectation.not : expectation
  }

  toBeVisible(options?: AssertionOptions): Promise<void> {
    return this.expectation.toBeVisible(options)
  }

  toBeHidden(options?: AssertionOptions): Promise<void> {
    return this.expectation.toBeHidden(options)
  }

  toBeEnabled(options?: AssertionOptions): Promise<void> {
    return this.expectation.toBeEnabled(options)
  }

  toBeDisabled(options?: AssertionOptions): Promise<void> {
    return this.expectation.toBeDisabled(options)
  }

  toBeFocused(options?: AssertionOptions): Promise<void> {
    return this.expectation.toBeFocused(options)
  }

  toHaveCount(count: number, options?: AssertionOptions): Promise<void> {
    return this.expectation.toHaveCount(count, options)
  }

  toHaveText(text: string | RegExp, options?: AssertionOptions): Promise<void> {
    return this.expectation.toHaveText(text, options)
  }

  toContainText(
    text: string | RegExp,
    options?: AssertionOptions,
  ): Promise<void> {
    return this.expectation.toContainText(text, options)
  }

  toHaveValue(
    value: string | RegExp,
    options?: AssertionOptions,
  ): Promise<void> {
    return this.expectation.toHaveValue(value, options)
  }

  toHaveClass(
    value: string | RegExp,
    options?: AssertionOptions,
  ): Promise<void> {
    return this.expectation.toHaveClass(value, options)
  }

  toHaveAttribute(
    name: string,
    value: string | RegExp,
    options?: AssertionOptions,
  ): Promise<void> {
    return this.expectation.toHaveAttribute(name, value, options)
  }
}
