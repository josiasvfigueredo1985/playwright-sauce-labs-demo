import type {Page} from '@playwright/test';
import {ButtonComponent} from '../../framework/components/button.component';
import {TextBoxComponent} from '../../framework/components/textbox.component';

export class LoginFormComponent {
  private usernameInputComponent?: TextBoxComponent;
  private passwordInputComponent?: TextBoxComponent;
  private loginButtonComponent?: ButtonComponent;

  constructor(private readonly page: Page) {}

  get usernameInput(): TextBoxComponent {
    return (this.usernameInputComponent ??= new TextBoxComponent(
        this.page,
        'Username',
    ));
  }

  get passwordInput(): TextBoxComponent {
    return (this.passwordInputComponent ??= new TextBoxComponent(
        this.page,
        'Password',
    ));
  }

  get loginButton(): ButtonComponent {
    return (this.loginButtonComponent ??= new ButtonComponent(
        this.page,
        'Login',
    ));
  }

  async signIn(username: string, password: string): Promise<void> {
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
  }
}
