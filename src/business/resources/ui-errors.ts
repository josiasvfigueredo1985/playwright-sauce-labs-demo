import type { UiErrorPattern } from '../../framework/utils/ui-error-guard.utils'

/** Messages that must stop the test when they surface in the page. */
export const WatchedUiErrors: readonly UiErrorPattern[] = [
  /TypeError/,
  /ReferenceError/,
  /Uncaught/,
  /ChunkLoadError/,
  /Something went wrong/i,
]
