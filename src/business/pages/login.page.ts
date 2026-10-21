import type { Page } from '@playwright/test';
import { LoginFormComponent } from '../components/login-form.component';

export class LoginPage {
  readonly form: LoginFormComponent;

  constructor(private readonly page: Page) {
    this.form = new LoginFormComponent(page);
  }

  async goto(): Promise<void> {
    await this.page.goto('/');
  }
}
