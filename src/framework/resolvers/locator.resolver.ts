import type { Locator } from "@playwright/test";
import type { LocatorParent } from "../types/locator.types";

type LocatorResolver = (locator: Locator) => Locator;
type InitialLocatorResolver = (parent: LocatorParent) => Locator;
type LocatorFilterOptions = NonNullable<Parameters<Locator["filter"]>[0]>;

export const LocatorPosition = {
  First: "first",
  Last: "last",
  Nth: "nth",
} as const;

export type LocatorPositionOptions =
  | { type: typeof LocatorPosition.First }
  | { type: typeof LocatorPosition.Last }
  | { type: typeof LocatorPosition.Nth; index: number };

export interface LocatorResolutionOptions {
  childLocator?: Locator;
  filter?: LocatorFilterOptions;
  position?: LocatorPositionOptions;
  within?: Locator;
}

function locatorResolvers(
  locator: Locator,
  options: LocatorResolutionOptions,
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
  options: LocatorResolutionOptions = {},
  ...resolvers: LocatorResolver[]
): Locator {
  return locatorResolvers(initialLocator(parent), options, resolvers);
}
