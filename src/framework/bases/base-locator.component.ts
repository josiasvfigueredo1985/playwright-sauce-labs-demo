import type { Locator } from '@playwright/test'
import { LocatorActionUtils } from '../utils/locator-action.utils'
import { LocatorAssertionUtils } from '../utils/locator-assertion.utils'

export class BaseLocatorComponent {
  protected readonly actions: LocatorActionUtils
  private readonly assertions: LocatorAssertionUtils

  constructor(protected readonly locator: Locator) {
    this.actions = new LocatorActionUtils(locator)
    this.assertions = new LocatorAssertionUtils(locator)
  }

  // Only the resolver may unwrap a component; tests and business code must stay on the DSL.
  static locatorOf(component: BaseLocatorComponent): Locator {
    return component.locator
  }

  get not(): LocatorAssertionUtils {
    return this.assertions.not
  }

  click(): Promise<void> {
    return this.actions.click()
  }

  toBeVisible(): Promise<void> {
    return this.assertions.toBeVisible()
  }

  toBeHidden(): Promise<void> {
    return this.assertions.toBeHidden()
  }

  toBeEnabled(): Promise<void> {
    return this.assertions.toBeEnabled()
  }

  toBeDisabled(): Promise<void> {
    return this.assertions.toBeDisabled()
  }

  toBeFocused(): Promise<void> {
    return this.assertions.toBeFocused()
  }

  toHaveCount(count: number): Promise<void> {
    return this.assertions.toHaveCount(count)
  }

  toHaveText(text: string | RegExp): Promise<void> {
    return this.assertions.toHaveText(text)
  }

  toContainText(text: string | RegExp): Promise<void> {
    return this.assertions.toContainText(text)
  }

  toHaveValue(value: string | RegExp): Promise<void> {
    return this.assertions.toHaveValue(value)
  }

  toHaveClass(value: string | RegExp): Promise<void> {
    return this.assertions.toHaveClass(value)
  }

  toHaveAttribute(name: string, value: string | RegExp): Promise<void> {
    return this.assertions.toHaveAttribute(name, value)
  }
}
