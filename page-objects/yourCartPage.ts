import { expect, type Locator, type Page } from '@playwright/test';

export class YourCartPage {
    readonly page: Page;
    readonly pageTitle: string;
    readonly title: Locator;
    readonly cartQuantity: Locator;
    readonly continueShoppingButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.pageTitle = "Your Cart";
        this.title = page.locator('//span[@class="title"]');
        this.cartQuantity = page.locator('//div[@class="cart_quantity"]');
        this.continueShoppingButton = page.locator('#continue-shopping');
    }
}