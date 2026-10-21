import { LoginPage } from '../pages/login.page';
import type { UrlActions } from '../fixtures/url.fixture';

export class AuthenticationWorkflow {
  constructor(
    private readonly loginPage: LoginPage,
    private readonly url: UrlActions,
  ) {}

  async signIn(username: string, password: string): Promise<void> {
    await this.url.goto(this.loginPage);
    await this.loginPage.form.signIn(username, password);
  }
}
