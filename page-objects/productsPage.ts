import { expect, type Locator, type Page } from '@playwright/test';

export class ProductsPage {
    readonly page: Page;
    readonly productsList: Locator;
    readonly pageTitle: string;
    readonly backPackAddToBagButton: Locator;
    readonly backPackRemoveButton: Locator;
    readonly shoppingCart: Locator;
    readonly itemImage: Locator;
    readonly inventoryItemName: Locator;
    readonly inventoryItemDesc: Locator;

    constructor(page: Page) {
        this.page = page;
        this.pageTitle = "Products";
        this.productsList = page.locator('//div[@class="inventory_item"]');
        this.backPackAddToBagButton = page.locator('#add-to-cart-sauce-labs-backpack');
        this.backPackRemoveButton = page.locator('#remove-sauce-labs-backpack');
        this.shoppingCart = page.locator('//a[@class="shopping_cart_link"]');
        this.itemImage = page.locator('#item_4_img_link');
        this.inventoryItemName = page.locator('//div[@class="inventory_item_name"]');
        this.inventoryItemDesc = page.locator('//div[@class="inventory_item_desc"]');
    }
}