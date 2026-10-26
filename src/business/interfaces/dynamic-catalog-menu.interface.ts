import type { ButtonComponent } from '../../framework/components'

// Object-like component: groups the dynamic catalog button and its submenu options.
export interface DynamicCatalogMenu {
  button: ButtonComponent
  lazyLoad: ButtonComponent
  spinner: ButtonComponent
  slider: ButtonComponent
}
