import { type Page, type Locator } from '@playwright/test';
import { type RegisterCredentials } from '../utils/testData';

export class RegisterPage {
  private readonly usernameInput: Locator;
  private readonly passwordInput: Locator;
  private readonly confirmPasswordInput: Locator;
  private readonly registerButton: Locator;
  readonly flashMessage: Locator;

  constructor(private readonly page: Page) {
    this.usernameInput        = page.locator('#username');
    this.passwordInput        = page.locator('#password');
    // Decided to "rewrite" username & password input eventhough they share same id, they don't share same url so maybe not same component
    this.confirmPasswordInput = page.locator('#confirmPassword');
    this.registerButton       = page.getByRole('button', { name: 'Register' });
    this.flashMessage         = page.locator('#flash');
  }

  async goto(): Promise<void> {
    await this.page.goto('/register',{waitUntil:'domcontentloaded'});
  }

  async register(credentials: RegisterCredentials): Promise<void> {
    await this.usernameInput.fill(credentials.username);
    await this.passwordInput.fill(credentials.password);
    await this.confirmPasswordInput.fill(credentials.confirmPassword);
    await this.registerButton.click();
  }
}
