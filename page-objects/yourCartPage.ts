import { expect, type Locator, type Page } from '@playwright/test';

export class YourCartPage {
    readonly page: Page;
    readonly pageTitle: string;
    readonly title: Locator;
    readonly cartQuantity: Locator;
    readonly continueShoppingButton: Locator;
    readonly checkoutButton: Locator;
    readonly removeTshirtFromCart: Locator;

    constructor(page: Page) {
        this.page = page;
        this.pageTitle = "Your Cart";
        this.title = page.locator('//span[@class="title"]');
        this.cartQuantity = page.locator('//div[@class="cart_quantity"]');
        this.continueShoppingButton = page.locator('#continue-shopping');
        this.checkoutButton = page.locator('#checkout');
        this.removeTshirtFromCart = page.locator('#remove-sauce-labs-bolt-t-shirt');
    }
}