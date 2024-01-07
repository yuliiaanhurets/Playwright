import { test, expect } from '@playwright/test';
import { LoginPage } from '../page-objects/loginPage';
import { ProductsPage } from '../page-objects/productsPage.ts';
import { YourCartPage } from '../page-objects/yourCartPage.ts';
import { BasePage } from '../page-objects/basePage.ts';

test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.login("standard_user", "secret_sauce");
});

test.describe('Swag Labs Suite', () => {
    test('product information should be displayed for logged in user', async ({ page }) => {
        const productsPage = new ProductsPage(page);
        const basePage = new BasePage(page);
        
        await expect(basePage.title).toHaveText(productsPage.pageTitle);
        await expect(productsPage.productsList).toHaveCount(6);
        await expect(productsPage.itemImage).toBeVisible();
        await expect(productsPage.inventoryItemName).toHaveText("Sauce Labs Backpack");
        await expect(productsPage.inventoryItemDesc).toContainText("streamlined Sly Pack that melds uncompromising style with unequaled laptop and tablet protection");
    });

    test('products should be added to bag', async ({ page }) => {
        const productsPage = new ProductsPage(page);
        const yourCartPage = new YourCartPage(page);
        const basePage = new BasePage(page);

        await expect(basePage.title).toHaveText(productsPage.pageTitle);
        await productsPage.backPackAddToBagButton.click();
        await expect(productsPage.backPackRemoveButton).toBeVisible();
        await expect(basePage.shoppingCartBadge).toHaveText("1");

        await basePage.shoppingCart.click();
        await expect(basePage.title).toHaveText(yourCartPage.pageTitle);
        await expect(yourCartPage.cartQuantity).toHaveText("1");
        await expect (yourCartPage.continueShoppingButton).toBeVisible();
    });

    test('should allow me to logout', async ({ page }) => {
        const loginPage = new LoginPage(page);
        const basePage = new BasePage(page);
        const productsPage = new ProductsPage(page);

        await basePage.clickOnBurgerButton(basePage.logoutButton);
   
        await expect(loginPage.userNameField).toBeVisible();
        await expect(loginPage.passwordField).toBeVisible();
        await expect(loginPage.signInButton).toBeVisible();
        await expect(productsPage.productsList).toBeHidden();
      });
});