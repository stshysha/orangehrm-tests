import { Page, Locator } from '@playwright/test';

export class EmployeeListPage {
  readonly page: Page;
  readonly employeeNameInput: Locator;
  readonly searchButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.employeeNameInput = page.getByPlaceholder('Type for hints...').first();
    this.searchButton = page.getByRole('button', { name: 'Search' });
  }

  async goto() {
    await this.page.goto('/web/index.php/pim/viewEmployeeList');
  }

  async searchByName(name: string) {
    await this.employeeNameInput.fill(name);
    await this.searchButton.click();
  }

  async clickFirstResult() {
    await this.page.waitForLoadState('networkidle');
    await this.page.locator('.oxd-table-body .oxd-table-row').first()
    .locator('.oxd-table-cell').nth(1).click();
  }
}