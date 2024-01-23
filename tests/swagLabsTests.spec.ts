import { test, expect } from '@playwright/test';
import { LoginPage } from '../page-objects/loginPage';
import { ProductsPage } from '../page-objects/productsPage.ts';
import { YourCartPage } from '../page-objects/yourCartPage.ts';
import { BasePage } from '../page-objects/basePage.ts';
import { CheckoutPage } from '../page-objects/checkoutPage.ts';

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
        await expect(yourCartPage.continueShoppingButton).toBeVisible();
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

test.describe('Swag Labs - Checkout Suite', () => {
    test('should allow me to see errors for empty fields on checkout page', async ({ page }) => {
        const productsPage = new ProductsPage(page);
        const basePage = new BasePage(page);
        const yourCartPage = new YourCartPage(page);
        const checkoutPage = new CheckoutPage(page);

        await expect(basePage.title).toHaveText(productsPage.pageTitle);
        await productsPage.backPackAddToBagButton.click();
        await expect(productsPage.backPackRemoveButton).toBeVisible();
        await expect(basePage.shoppingCartBadge).toHaveText("1");

        await basePage.shoppingCart.click();
        await expect(yourCartPage.cartQuantity).toHaveText("1");
        await expect(yourCartPage.continueShoppingButton).toBeVisible();

        await yourCartPage.checkoutButton.click();
        await expect(checkoutPage.title).toHaveText(checkoutPage.pageCheckoutYourInfoTitle);
        await expect(checkoutPage.firstNameField).toBeVisible();
        await expect(checkoutPage.lastNameField).toBeVisible();
        await expect(checkoutPage.zipCodeField).toBeVisible();

        await checkoutPage.continueButton.click();
        await expect(checkoutPage.errorButton).toContainText("Error: First Name is required");

        await checkoutPage.firstNameField.fill("Yuliia");
        await checkoutPage.continueButton.click();
        await expect(checkoutPage.errorButton).toContainText("Error: Last Name is required");

        await checkoutPage.lastNameField.fill("Anhurets");
        await checkoutPage.continueButton.click();
        await expect(checkoutPage.errorButton).toContainText("Error: Postal Code is required");

        await checkoutPage.firstNameField.fill("33900");
        await checkoutPage.continueButton.click();
        await expect(checkoutPage.errorButton).toBeHidden();
    });

    test('should allow me to finish purchase with one product', async ({ page }) => {
        const productsPage = new ProductsPage(page);
        const basePage = new BasePage(page);
        const yourCartPage = new YourCartPage(page);
        const checkoutPage = new CheckoutPage(page);

        await expect(basePage.title).toHaveText(productsPage.pageTitle);
        await productsPage.backPackAddToBagButton.click();
        await expect(productsPage.backPackRemoveButton).toBeVisible();
        await expect(basePage.shoppingCartBadge).toHaveText("1");

        await basePage.shoppingCart.click();
        await expect(yourCartPage.cartQuantity).toHaveText("1");
        await expect(yourCartPage.continueShoppingButton).toBeVisible();
        await yourCartPage.checkoutButton.click();
        await expect(checkoutPage.title).toHaveText(checkoutPage.pageCheckoutYourInfoTitle);

        await checkoutPage.fillYourInformation("James", "Smith", "33900");
        await checkoutPage.continueButton.click();

        await expect(checkoutPage.title).toHaveText(checkoutPage.pageCheckoutOverviewTitle);
        await expect(checkoutPage.paymentInformation).toContainText("Payment Information");

        await checkoutPage.finishButton.click();
        await expect(checkoutPage.title).toHaveText(checkoutPage.pageCheckoutOverviewTitle);
        await expect(checkoutPage.completeHeader).toHaveText("Thank you for your order!");
        await expect(checkoutPage.backHomeButton).toBeVisible();
    });

    test('should allow me to remove one product from bag and finish purchase', async ({ page }) => {
        const productsPage = new ProductsPage(page);
        const basePage = new BasePage(page);
        const yourCartPage = new YourCartPage(page);
        const checkoutPage = new CheckoutPage(page);

        await expect(basePage.title).toHaveText(productsPage.pageTitle);
        await productsPage.backPackAddToBagButton.click();
        await productsPage.tshirtAddToBagButton.click();
        await expect(productsPage.backPackRemoveButton).toBeVisible();
        await expect(basePage.shoppingCartBadge).toHaveText("2");

        await basePage.shoppingCart.click();
        await expect(yourCartPage.cartQuantity).toHaveText("2");
        await expect(yourCartPage.continueShoppingButton).toBeVisible();

        await yourCartPage.removeTshirtFromCart.click();
        await expect(basePage.shoppingCartBadge).toHaveText("1");

        await yourCartPage.checkoutButton.click();
        await expect(checkoutPage.title).toHaveText(checkoutPage.pageCheckoutYourInfoTitle);

        await checkoutPage.fillYourInformation("James", "Smith", "33900");
        await checkoutPage.continueButton.click();

        await expect(checkoutPage.title).toHaveText(checkoutPage.pageCheckoutOverviewTitle);
        await expect(checkoutPage.paymentInformation).toContainText("Payment Information");

        await checkoutPage.finishButton.click();
        await expect(checkoutPage.title).toHaveText(checkoutPage.pageCheckoutOverviewTitle);
        await expect(checkoutPage.completeHeader).toHaveText("Thank you for your order!");
        await expect(checkoutPage.backHomeButton).toBeVisible();
    });
});