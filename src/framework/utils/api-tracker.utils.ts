import type { Page, Request } from '@playwright/test'

const DEFAULT_TIMEOUT_MS = 10_000

const GOOGLE_API = /^https?:\/\/([^/]+\.)?googleapis\.com\//
const GRAPHQL_API = /\/graphql(\/|\?|$)/

/** Google APIs, GraphQL endpoints, and any REST call (fetch/xhr). */
function isTrackedApi(request: Request): boolean {
  const url = request.url()
  return (
    GOOGLE_API.test(url) ||
    GRAPHQL_API.test(url) ||
    ['fetch', 'xhr'].includes(request.resourceType())
  )
}

/**
 * Counts in-flight API requests from the moment it is attached.
 * Only completion matters: status codes and failures are ignored, and a
 * failed request counts as resolved.
 */
export class ApiTracker {
  private static readonly trackers = new WeakMap<Page, ApiTracker>()

  private readonly pending = new Set<Request>()
  private waiters: Array<() => void> = []

  private constructor(page: Page) {
    page.on('request', (request) => {
      if (isTrackedApi(request)) this.pending.add(request)
    })
    const settle = (request: Request): void => {
      if (this.pending.delete(request) && this.pending.size === 0) {
        const waiters = this.waiters
        this.waiters = []
        waiters.forEach((resolve) => resolve())
      }
    }
    page.on('requestfinished', settle)
    page.on('requestfailed', settle)
  }

  /** One tracker per page, so listeners are never attached twice. */
  static attach(page: Page): ApiTracker {
    let tracker = ApiTracker.trackers.get(page)
    if (!tracker) {
      tracker = new ApiTracker(page)
      ApiTracker.trackers.set(page, tracker)
    }
    return tracker
  }

  /** Resolves when no tracked API is in flight, or silently after the timeout. */
  async waitForIdle(timeoutMs: number = DEFAULT_TIMEOUT_MS): Promise<void> {
    if (this.pending.size === 0) return

    await new Promise<void>((resolve) => {
      const done = (): void => {
        clearTimeout(timer)
        resolve()
      }
      const timer = setTimeout(() => {
        this.waiters = this.waiters.filter((waiter) => waiter !== done)
        resolve()
      }, timeoutMs)
      this.waiters.push(done)
    })
  }
}
