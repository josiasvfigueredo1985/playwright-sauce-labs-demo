import { ButtonComponent } from '../../framework/components/button.component'
import { TextBoxComponent } from '../../framework/components/textbox.component'
import { BaseComponent } from './base-component'

export class LoginFormComponent extends BaseComponent {
  get usernameInput(): TextBoxComponent {
    return new TextBoxComponent(this.root, 'Username')
  }

  get passwordInput(): TextBoxComponent {
    return new TextBoxComponent(this.root, 'Password')
  }

  get loginButton(): ButtonComponent {
    return new ButtonComponent(this.root, 'Login')
  }

  async signIn(username: string, password: string): Promise<void> {
    await this.usernameInput.fill(username)
    await this.passwordInput.fill(password)
    await this.loginButton.click()
  }
}
