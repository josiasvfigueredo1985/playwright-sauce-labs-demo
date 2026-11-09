import type { Locator } from '@playwright/test'
import { ApiTracker } from './api-tracker.utils'
import { UiErrorGuard } from './ui-error-guard.utils'

export type SelectOptionTarget = string | { label: string } | { value: string }

export class LocatorActionUtils {
  constructor(private readonly locator: Locator) {}

  /** Runs before every action: APIs must have settled and no watched UI error may exist. */
  private async beforeAction(): Promise<void> {
    const page = this.locator.page()
    await ApiTracker.attach(page).waitForIdle()
    UiErrorGuard.of(page)?.assertNone()
  }

  async click(): Promise<void> {
    await this.beforeAction()
    return this.locator.click()
  }

  async fill(value: string): Promise<void> {
    await this.beforeAction()
    return this.locator.fill(value)
  }

  async clear(): Promise<void> {
    await this.beforeAction()
    return this.locator.clear()
  }

  async selectOption(option: SelectOptionTarget): Promise<string[]> {
    await this.beforeAction()
    return this.locator.selectOption(option)
  }

  getText(): Promise<string> {
    return this.locator.innerText()
  }

  getValue(): Promise<string> {
    return this.locator.inputValue()
  }

  isEnabled(): Promise<boolean> {
    return this.locator.isEnabled()
  }

  isDisabled(): Promise<boolean> {
    return this.locator.isDisabled()
  }
}
