import { test, expect } from '@playwright/test';
import { BmiPage } from '../pages/BmiPage';
import { BMI_INPUT } from '../utils/testData';

test.describe('BMI Calculator', () => {
  test('BMI is correctly calculated from inputs', async ({ page }) => {
    const bmiPage = new BmiPage(page);

    await bmiPage.goto();
    await bmiPage.fillForm(BMI_INPUT);
    await bmiPage.calculate();

    const expectedBmi = bmiPage.expectedBmiResult(BMI_INPUT);

    await expect(bmiPage.bmiResult, 'BMI result should be visible after calculation').toBeVisible();
    await expect(bmiPage.bmiResult, 'BMI result should match the expected calculated value').toContainText(expectedBmi);
  });
});