import type { Locator } from '@playwright/test'

export type SelectOptionTarget = string | { label: string } | { value: string }

export class LocatorActionUtils {
  constructor(private readonly locator: Locator) {}

  click(): Promise<void> {
    return this.locator.click()
  }

  fill(value: string): Promise<void> {
    return this.locator.fill(value)
  }

  clear(): Promise<void> {
    return this.locator.clear()
  }

  selectOption(option: SelectOptionTarget): Promise<string[]> {
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
