import type { Locator } from "@playwright/test";
import { LocatorPosition } from "../constants/locator-position.constants";
import {
  type InitialLocatorResolver,
  type LocatorOptions,
  type LocatorParent,
  type LocatorResolver,
} from "../types/locator.types";

function locatorResolvers(
  locator: Locator,
  options: LocatorOptions,
  resolvers: LocatorResolver[],
): Locator {
  let resolvedLocator = locator;

  if (options.within) {
    resolvedLocator = resolvedLocator.within(options.within);
  }
  if (options.filter) {
    resolvedLocator = resolvedLocator.filter(options.filter);
  }
  if (options.childLocator) {
    resolvedLocator = resolvedLocator.filter({ has: options.childLocator });
  }
  if (options.and) {
    resolvedLocator = resolvedLocator.and(options.and);
  }

  if (options.position?.type === LocatorPosition.First) {
    resolvedLocator = resolvedLocator.first();
  } else if (options.position?.type === LocatorPosition.Last) {
    resolvedLocator = resolvedLocator.last();
  } else if (options.position?.type === LocatorPosition.Nth) {
    resolvedLocator = resolvedLocator.nth(options.position.index);
  }

  return resolvers.reduce(
    (current, resolver) => resolver(current),
    resolvedLocator,
  );
}

export function resolveLocator(
  parent: LocatorParent,
  initialLocator: InitialLocatorResolver,
  options: LocatorOptions = {},
  ...resolvers: LocatorResolver[]
): Locator {
  return locatorResolvers(initialLocator(parent), options, resolvers);
}
