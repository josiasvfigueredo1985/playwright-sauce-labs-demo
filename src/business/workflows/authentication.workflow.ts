import { LoginPage } from '../pages/login.page'

export class AuthenticationWorkflow {
  constructor(private readonly loginPage: LoginPage) {}

  async signIn(username: string, password: string): Promise<void> {
    await this.loginPage.goto()
    await this.loginPage.form.signIn(username, password)
  }
}
