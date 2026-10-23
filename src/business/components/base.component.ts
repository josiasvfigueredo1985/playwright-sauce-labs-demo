import type { LocatorParent } from '../../framework/types/locator.types'

export abstract class BaseComponent {
  constructor(protected readonly root: LocatorParent) {}
}
