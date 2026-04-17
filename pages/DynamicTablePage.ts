import { type Page, type Locator } from '@playwright/test';

export class DynamicTablePage {
  private readonly tableHeaders: Locator;
  private readonly tableRows: Locator;
  readonly chromeCpuLabel: Locator;

  constructor(private readonly page: Page) {
    this.tableHeaders = page.locator('table thead th')
    this.tableRows = page.locator('table tbody tr');
    this.chromeCpuLabel = page.locator('#chrome-cpu');
  }

  async goto(): Promise<void> {
    await this.page.goto('/dynamic-table',{waitUntil:'domcontentloaded'});
  }

  async getCpuValueForChromeByHeader(): Promise<string> {

    // Looking for the index of CPU because changes every refresh
    const headers = await this.tableHeaders.allInnerTexts();
    const cpuIndex = headers.indexOf('CPU');

    const rows = await this.tableRows.all();

    // Select the Chrome row among the table, then fin the cpu value in this row based on the column index before
    for (const row of rows) {
      const cells = row.locator('td');
      if (await cells.nth(0).innerText() === 'Chrome') {
        const cpu = await cells.nth(cpuIndex).innerText()
        return cpu;
      }
    }
    
    throw new Error('Chrome row not found in table');
  }

}