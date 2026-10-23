import { LoginFormComponent } from '../components/login-form.component'
import { BaseWebPage } from '../../framework/bases/base-web-page'

export class LoginPage extends BaseWebPage {
  protected readonly path = '/'
  get form(): LoginFormComponent {
    return new LoginFormComponent(this.page)
  }
}
