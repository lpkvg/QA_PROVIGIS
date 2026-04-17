import { test, expect } from '@playwright/test';
import { DynamicTablePage } from '../pages/DynamicTablePage';

test.describe('Dynamic Table', () => {
  test('Chrome CPU value in table matches the yellow label', async ({ page }) => {
    const dynamicTablePage = new DynamicTablePage(page);

    await dynamicTablePage.goto();

    const tableCpuValue = await dynamicTablePage.getCpuValueForChromeByHeader();
    const labelText = await dynamicTablePage.chromeCpuLabel.textContent();
    const labelCpuValue = labelText?.replace('Chrome CPU:', '').trim() ?? '';

    expect(
      tableCpuValue,
      'Chrome CPU value in table should match the yellow label'
    ).toBe(labelCpuValue);
  });

});