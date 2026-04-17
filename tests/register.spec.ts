import { test, expect } from '@playwright/test';
import { RegisterPage } from '../pages/RegisterPage';
import { validRegisterCredentials } from '../utils/testData';

test.describe('Register', () => {
  test('successful registration with valid credentials', async ({ page }) => {
    const registerPage = new RegisterPage(page);

    await registerPage.goto();
    await registerPage.register(validRegisterCredentials);

    await expect(page, 'Should redirect to /login after successful registration').toHaveURL('/login');
    await expect(registerPage.flashMessage, 'Should display success message after registration').toContainText('Successfully registered, you can log in now.');
  });
});