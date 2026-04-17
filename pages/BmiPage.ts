import { type Page, type Locator } from '@playwright/test';
import { type BmiInput } from '../utils/testData';

export class BmiPage {
  private readonly genderSelect: Locator;
  private readonly ageInput: Locator;
  private readonly heightInput: Locator;
  private readonly weightInput: Locator;
  private readonly calculateButton: Locator;
  readonly bmiResult: Locator;

  constructor(private readonly page: Page) {
    this.genderSelect    = page.locator('#gender');
    this.ageInput        = page.locator('#age');
    this.heightInput     = page.locator('#height');
    this.weightInput     = page.locator('#weight');
    this.calculateButton = page.getByRole('button', { name: 'Calculate' });
    this.bmiResult       = page.locator('#bmi-gauge text[style*="font-weight: bold"]');
  }

  async goto(): Promise<void> {
    await this.page.goto('/bmi',{waitUntil:'domcontentloaded'});
    await this.page.pause()
  }

  async fillForm(input: BmiInput): Promise<void> {
    await this.genderSelect.selectOption(input.gender);
    await this.ageInput.fill(String(input.age));
    await this.heightInput.fill(String(input.height));
    await this.weightInput.fill(String(input.weight));
  }

  async calculate(): Promise<void> {
    await this.calculateButton.click();
  }

  expectedBmiResult(input: BmiInput): string {
    const height = input.height / 100;
    return (input.weight / height ** 2).toFixed(1);
  }
}
