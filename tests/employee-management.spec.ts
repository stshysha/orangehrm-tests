import { test, expect } from '@playwright/test';
import { LoginPage } from './pages/LoginPage';
import { AddEmployeePage } from './pages/AddEmployeePage';
import { EmployeeListPage } from './pages/EmployeeListPage';
import { EditEmployeePage } from './pages/EditEmployeePage';
import { testEmployee, credentials } from './data/employees';

test.describe('Employee Management', () => {
    test.slow();
    
  test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.login(credentials.username, credentials.password);
    await expect(page).toHaveURL(/dashboard/);
  });

  test('Create new employee', async ({ page }) => {
    const addPage = new AddEmployeePage(page);
    await addPage.goto();
    await addPage.fillEmployeeDetails(
      testEmployee.firstName,
      testEmployee.lastName
    );
    await addPage.save();

    await expect(page).toHaveURL(/viewPersonalDetails/);
    await page.waitForLoadState('networkidle');
    await expect(page.getByPlaceholder('First Name')).toHaveValue(testEmployee.firstName, { timeout: 10000 });
    await expect(page.getByPlaceholder('Last Name')).toHaveValue(testEmployee.lastName, { timeout: 10000 });
    });

  test('Search for employee', async ({ page }) => {
    const listPage = new EmployeeListPage(page);
    await listPage.goto();
    await listPage.searchByName(testEmployee.firstName);

    await expect(page.getByRole('row').nth(1)).toContainText(testEmployee.firstName);
  });

  test('Open employee profile', async ({ page }) => {
    const listPage = new EmployeeListPage(page);
    await listPage.goto();
    await listPage.searchByName(testEmployee.firstName);
    await listPage.clickFirstResult();

    await expect(page).toHaveURL(/viewPersonalDetails/);
  });

test('Edit employee first name', async ({ page }) => {
  const listPage = new EmployeeListPage(page);
  await listPage.goto();
  await listPage.searchByName(`${testEmployee.firstName} ${testEmployee.lastName}`);
  await page.waitForLoadState('networkidle');
  await listPage.clickFirstResult();

  const editPage = new EditEmployeePage(page);
  await expect(page.getByPlaceholder('First Name')).toHaveValue(testEmployee.firstName);
  await editPage.editFirstName(testEmployee.updatedFirstName);
  await editPage.save();

  await expect(page.getByText('Successfully Updated')).toBeVisible();
  await page.reload();
  await page.waitForLoadState('networkidle');
  await expect(page.getByPlaceholder('First Name')).toHaveValue(testEmployee.updatedFirstName);
});

});