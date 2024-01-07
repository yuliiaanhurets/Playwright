import { expect, type Locator, type Page } from '@playwright/test';

export class BasePage {
    readonly page: Page;
    readonly title: Locator;
    readonly shoppingCartBadge: Locator;
    readonly shoppingCart: Locator;
    readonly burgerButton: Locator;
    readonly logoutButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.title = page.locator('//span[@class="title"]');
        this.shoppingCartBadge = page.locator('//span[@class="shopping_cart_badge"]');
        this.shoppingCart = page.locator('//a[@class="shopping_cart_link"]');
        this.burgerButton = page.locator('#react-burger-menu-btn');
        this.logoutButton = page.locator('#logout_sidebar_link');
    }

    async clickOnBurgerButton(button: Locator) {
        await this.burgerButton.click();
        await button.click()
    }
}