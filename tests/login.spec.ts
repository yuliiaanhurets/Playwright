import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.goto('https://www.globalsqa.com/angularJs-protractor/BankingProject/#/login');
});

test.describe('Customer Login', () => {
  test('home page should display title and buttons', async ({ page }) => {
    await expect(page).toHaveTitle(/XYZ Bank/);
    await expect(page.getByRole('button', { name: 'Home' })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Customer Login' })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Bank Manager Login' })).toBeVisible();
  });

  test('should allow me to login as customer', async ({ page }) => {
    await page.getByRole('button', { name: 'Customer Login' }).click();
    await expect(page.getByText('Your Name :')).toBeVisible();
    await expect(page.getByRole('button', { name: 'Login' })).not.toBeVisible();
    await page.selectOption('#userSelect', 'Harry Potter');
    await expect(page.getByRole('button', { name: 'Login' })).toBeVisible();

    await page.getByRole('button', { name: 'Login' }).click();
    await expect(page.getByText('Harry Potter')).toBeVisible();
    await expect(page.getByRole('button', { name: 'Logout' })).toBeVisible();
  });
});

test.describe('Admin Login', () => {
  test('should allow me to login as admin - Add Customer', async ({ page }) => {
    await page.getByRole('button', { name: 'Bank Manager Login' }).click();
    await page.getByRole('button', { name: 'Add Customer' }).click();

    await page.getByPlaceholder('First Name').fill('John');
    await page.getByPlaceholder('Last Name').fill('Smith');
    await page.getByPlaceholder('Post Code').fill('39000');

    await page.getByRole('button', { name: 'Add Customer' }).first().click();
    page.on('dialog', dialog => dialog.accept());
  });

  test('should allow me to login as admin - Open Account', async ({ page }) => {
    await page.getByRole('button', { name: 'Bank Manager Login' }).click();
    await page.getByRole('button', { name: 'Open Account' }).click();

    await expect(page.getByText('Customer :')).toBeVisible();
    await page.selectOption('#userSelect', 'Albus Dumbledore');
    await expect(page.getByText('Currency :')).toBeVisible();
    await page.selectOption('#currency', 'Dollar');

    await page.getByRole('button', { name: 'Process' }).click();
    page.on('dialog', dialog => dialog.accept());
  });

  test('should allow me to login as admin - Customers', async ({ page }) => {
    await page.getByRole('button', { name: 'Bank Manager Login' }).click();
    await page.getByRole('button', { name: 'Customers' }).click();

    await page.getByPlaceholder('Search Customer').fill('Harry');
    await expect(page.locator('tr').nth(1)).toContainText('Harry');
    await expect(page.locator('tr').nth(2)).toContainText('Potter');
    await expect(page.getByRole('button', { name: 'Delete' })).toBeVisible();
  });
});