import type { Page } from '@playwright/test';
import { LoginFormComponent } from '../components/login-form.component';
import type { IRoutablePage } from '../../framework/interfaces/i-routable-page';

export class LoginPage implements IRoutablePage {
  readonly path = '/';
  private formComponent?: LoginFormComponent;

  constructor(private readonly page: Page) {}

  get form(): LoginFormComponent {
    return (this.formComponent ??= new LoginFormComponent(this.page));
  }
}
