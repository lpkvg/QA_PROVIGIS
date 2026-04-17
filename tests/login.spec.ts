import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { validCredentials } from '../utils/testData';

test.describe('Login', () => {
  test('successful login with valid credentials', async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.goto();
    await loginPage.login(validCredentials);

    await expect(page, 'Should redirect to /secure after successful login').toHaveURL('/secure');
    await expect(loginPage.flashMessage, 'Should display success message after login').toContainText('You logged into a secure area!');
  });

  // In a real life scenario, we would add other positive test cases (after pw recovery) negative test case (wrong username, wrong password)
  // boundary (maximum character), edge cases (special characters)
});