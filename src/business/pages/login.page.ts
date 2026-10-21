import type { Page } from '@playwright/test';
import { LoginFormComponent } from '../components/login-form.component';
import type { IUrlActions } from '../../framework/interfaces/i-url-actions';
import { BaseWebPage } from '../../framework/bases/base-web-page';

export class LoginPage extends BaseWebPage {
  readonly path = '/';
  private formComponent?: LoginFormComponent;

  constructor(
    private readonly page: Page,
    url: IUrlActions,
  ) {
    super(url);
  }

  get form(): LoginFormComponent {
    return (this.formComponent ??= new LoginFormComponent(this.page));
  }
}
