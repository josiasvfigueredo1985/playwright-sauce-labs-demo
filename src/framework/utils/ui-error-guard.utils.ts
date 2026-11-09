import type { Page } from '@playwright/test'

export type UiErrorPattern = string | RegExp

export interface UiError {
  source: 'pageerror' | 'console'
  message: string
}

const matches = (message: string, pattern: UiErrorPattern): boolean =>
  typeof pattern === 'string'
    ? message.includes(pattern)
    : pattern.test(message)

/**
 * Watches uncaught page exceptions and console errors, which Playwright does
 * not fail on, and records the ones matching the given patterns.
 * It only records; call `assertNone()` to stop the test.
 */
export class UiErrorGuard {
  private static readonly guards = new WeakMap<Page, UiErrorGuard>()

  private readonly found: UiError[] = []

  private constructor(
    page: Page,
    private readonly patterns: readonly UiErrorPattern[],
  ) {
    page.on('pageerror', (error) => this.record('pageerror', error.message))
    page.on('console', (message) => {
      if (message.type() === 'error') this.record('console', message.text())
    })
  }

  /** One guard per page, so listeners are never attached twice. */
  static attach(page: Page, patterns: readonly UiErrorPattern[]): UiErrorGuard {
    let guard = UiErrorGuard.guards.get(page)
    if (!guard) {
      guard = new UiErrorGuard(page, patterns)
      UiErrorGuard.guards.set(page, guard)
    }
    return guard
  }

  /** The guard already attached to this page, if any. */
  static of(page: Page): UiErrorGuard | undefined {
    return UiErrorGuard.guards.get(page)
  }

  get errors(): readonly UiError[] {
    return this.found
  }

  /** Throws if any watched error was recorded since the guard was attached. */
  assertNone(): void {
    if (this.found.length === 0) return

    const details = this.found
      .map((error) => `- [${error.source}] ${error.message}`)
      .join('\n')
    throw new Error(`UI errors detected:\n${details}`)
  }

  private record(source: UiError['source'], message: string): void {
    if (this.patterns.some((pattern) => matches(message, pattern))) {
      this.found.push({ source, message })
    }
  }
}
