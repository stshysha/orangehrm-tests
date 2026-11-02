import { Page, Locator } from '@playwright/test';

export class EditEmployeePage {
  readonly page: Page;
  readonly firstNameInput: Locator;
  readonly lastNameInput: Locator;
  readonly saveButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.firstNameInput = page.getByPlaceholder('First Name');
    this.lastNameInput = page.getByPlaceholder('Last Name');
    this.saveButton = page.getByRole('button', { name: 'Save' }).first();
  }

  async getFirstName(): Promise<string> {
    return await this.firstNameInput.inputValue();
  }

  async getLastName(): Promise<string> {
    return await this.lastNameInput.inputValue();
  }

  async editFirstName(name: string) {
    await this.firstNameInput.clear();
    await this.firstNameInput.fill(name);
  }

  async save() {
    await this.saveButton.click();
  }
}