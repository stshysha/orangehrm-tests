import { test, expect } from '@playwright/test';
import { LoginPage } from './pages/LoginPage';
import { AddEmployeePage } from './pages/AddEmployeePage';
import { EmployeeListPage } from './pages/EmployeeListPage';
import { credentials } from './data/employees';

test.describe('PIM Additional Scenarios', () => {

  test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.login(credentials.username, credentials.password);
    await expect(page).toHaveURL(/dashboard/);
  });

test('Create second employee and verify employee ID is generated', async ({ page }) => {
  const addPage = new AddEmployeePage(page);
  await addPage.goto();

  const randomNum = Date.now().toString().slice(-4);
  await addPage.fillEmployeeDetails(`Auto${randomNum}`, 'Generated');
  await addPage.save();

  await expect(page).toHaveURL(/viewPersonalDetails/, { timeout: 10000 });
  await expect(page.getByPlaceholder('First Name')).toHaveValue(`Auto${randomNum}`);

    // Verify Employee ID was auto-generated — URL contains the numeric employee ID
    const currentUrl = page.url();
    expect(currentUrl).toMatch(/empNumber\/\d+/);
});

  test('Verify employee appears in list after creation', async ({ page }) => {
    // Create employee
    const addPage = new AddEmployeePage(page);
    await addPage.goto();
    await addPage.fillEmployeeDetails('Verify', 'ListTest');
    await addPage.save();
    await expect(page).toHaveURL(/viewPersonalDetails/);

    // Search and verify in list
    const listPage = new EmployeeListPage(page);
    await listPage.goto();
    await listPage.searchByName('Verify');
    await page.waitForLoadState('networkidle');

    await expect(
      page.locator('.oxd-table-body .oxd-table-row').first()
    ).toContainText('Verify');
  });

});