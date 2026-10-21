import { LoginFormComponent } from '../components/login-form.component';
import { BaseWebPage } from '../../framework/bases/base-web-page';

export class LoginPage extends BaseWebPage {
  readonly path = '/';
  private formComponent?: LoginFormComponent;

  get form(): LoginFormComponent {
    return (this.formComponent ??= new LoginFormComponent(this.page));
  }
}
