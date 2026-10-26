import type { Locator } from '@playwright/test'
import { BaseLocatorComponent } from '../bases/base-locator.component'
import { LocatorPosition } from '../constants/locator-position.constants'
import {
  type InitialLocatorResolver,
  type LocatorOptions,
  type LocatorParent,
  type LocatorResolver,
  type LocatorSource,
} from '../types/locator.types'

/** Unwraps a component into its Locator. Only the framework should call this. */
export function toLocator(source: LocatorSource): Locator {
  return source instanceof BaseLocatorComponent
    ? BaseLocatorComponent.locatorOf(source)
    : source
}

function locatorResolvers(
  locator: Locator,
  options: LocatorOptions,
  resolvers: LocatorResolver[],
): Locator {
  let resolvedLocator = locator

  if (options.within) {
    resolvedLocator = resolvedLocator.within(toLocator(options.within))
  }
  if (options.filter) {
    const { has, hasNot, ...filter } = options.filter

    resolvedLocator = resolvedLocator.filter({
      ...filter,
      ...(has && { has: toLocator(has) }),
      ...(hasNot && { hasNot: toLocator(hasNot) }),
    })
  }
  if (options.childLocator) {
    resolvedLocator = resolvedLocator.filter({
      has: toLocator(options.childLocator),
    })
  }
  if (options.and) {
    resolvedLocator = resolvedLocator.and(toLocator(options.and))
  }

  if (options.position?.type === LocatorPosition.First) {
    resolvedLocator = resolvedLocator.first()
  } else if (options.position?.type === LocatorPosition.Last) {
    resolvedLocator = resolvedLocator.last()
  } else if (options.position?.type === LocatorPosition.Nth) {
    resolvedLocator = resolvedLocator.nth(options.position.index)
  }

  return resolvers.reduce(
    (current, resolver) => toLocator(resolver(current)),
    resolvedLocator,
  )
}

/**
 * Builds a Locator from a parent, an initial query and optional refinements.
 * Options are applied in order: within, filter, childLocator, and, position.
 * Each resolver in `resolvers` then runs on the result, in order.
 *
 * @param parent Page, locator or component the query starts from.
 * @param initialLocator Query run on the parent, e.g. `(root) => root.getByRole('row')`.
 * @param options See {@link LocatorOptions}.
 * @param resolvers Extra steps that refine the locator after the options.
 *
 * @example
 * resolveLocator(page, (root) => root.getByRole('row'), {
 *   filter: { hasText: 'Menu' },
 * })
 */
export function resolveLocator(
  parent: LocatorParent,
  initialLocator: InitialLocatorResolver,
  options: LocatorOptions = {},
  ...resolvers: LocatorResolver[]
): Locator {
  const root =
    parent instanceof BaseLocatorComponent ? toLocator(parent) : parent

  return locatorResolvers(initialLocator(root), options, resolvers)
}
