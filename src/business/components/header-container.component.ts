import { BaseLocatorComponent } from "../../framework/bases/base-locator.component";
import { ButtonComponent } from "../../framework/components/button.component";
import { ComboBoxComponent } from "../../framework/components/combobox.component";
import { TextComponent } from "../../framework/components/text.component";
import { DataTestComponent } from "../../framework/components/data-test.component";

export class HeaderContainerComponent extends BaseLocatorComponent {
  private openMenuButtonComponent?: ButtonComponent;
  private logoTextComponent?: TextComponent;
  private shoppingCartComponent?: ButtonComponent;
  private productSortComponent?: ComboBoxComponent;

  get openMenuButton(): ButtonComponent {
    return (this.openMenuButtonComponent ??= new ButtonComponent(
      this.locator,
      "Open Menu",
    ));
  }

  get logoText(): TextComponent {
    return (this.logoTextComponent ??= new TextComponent(
      this.locator,
      "Swag Labs",
      { exact: true },
    ));
  }

  get shoppingCartEmpty(): ButtonComponent {
    return (this.shoppingCartComponent ??= new ButtonComponent(
      this.locator,
      /^Cart, (?:empty)$/,
      {
        and: new DataTestComponent(this.locator, "shopping-cart-link").locator,
      },
    ));
  }

  get shoppingCartWithItems(): ButtonComponent {
    return (this.shoppingCartComponent ??= new ButtonComponent(
      this.locator,
      /^Cart, (\d+ items)$/,
      {
        and: new DataTestComponent(this.locator, "shopping-cart-link").locator,
      },
    ));
  }

  get productSort(): ComboBoxComponent {
    return (this.productSortComponent ??= new ComboBoxComponent(this.locator, {
      name: "Sort products",
    }));
  }
}
