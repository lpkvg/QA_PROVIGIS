import { type Page, type Locator } from '@playwright/test';
import { type LoginCredentials } from '../utils/testData';

export class LoginPage {
  private readonly usernameInput: Locator;
  private readonly passwordInput: Locator;
  private readonly loginButton: Locator;
  readonly flashMessage: Locator;

  constructor(private readonly page: Page) {
    this.usernameInput = page.locator('#username');
    this.passwordInput = page.locator('#password');
    this.loginButton   = page.getByRole('button', { name: 'Login' });
    this.flashMessage  = page.locator('#flash');
  }

  async goto(): Promise<void> {
    await this.page.goto('/login',{waitUntil:'domcontentloaded'});
  }

  async login(credentials: LoginCredentials): Promise<void> {
    await this.usernameInput.fill(credentials.username);
    await this.passwordInput.fill(credentials.password);
    await this.loginButton.click();
  }
}