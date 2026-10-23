import { SwagLabsLoginFormComponent } from '../components/swag-labs-login-form.component'
import { BaseWebPage } from '../../framework/bases/base-web.page'

export class LoginPage extends BaseWebPage {
  protected readonly path = '/'
  get form(): SwagLabsLoginFormComponent {
    return new SwagLabsLoginFormComponent(this.page)
  }
}
