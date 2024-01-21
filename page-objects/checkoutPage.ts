import { expect, type Locator, type Page } from '@playwright/test';

export class CheckoutPage {
    readonly page: Page;
    readonly title: Locator;
    readonly continueButton: Locator;
    readonly errorButton: Locator;
    readonly finishButton: Locator

    // Checkout: Your Information
    readonly firstNameField: Locator;
    readonly lastNameField: Locator;
    readonly zipCodeField: Locator;
    readonly pageCheckoutYourInfoTitle: string;

    // Checkout: Overview
    readonly pageCheckoutOverviewTitle: string;
    readonly paymentInformation: Locator;

    // Checkout: Complete
    readonly pageCheckoutCompleteTitle: string;
    readonly completeHeader: Locator;
    readonly backHomeButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.pageCheckoutYourInfoTitle = "Checkout: Your Information";
        this.pageCheckoutOverviewTitle = "Checkout: Overview";
        this.pageCheckoutOverviewTitle = "Checkout: Complete!";
        this.title = page.locator('//span[@class="title"]');
        this.firstNameField = page.locator('#first-name');
        this.lastNameField = page.locator('#last-name');
        this.zipCodeField = page.locator('#postal-code');
        this.continueButton = page.locator('#continue');
        this.errorButton = page.locator('//h3[@data-test="error"]');
        this.paymentInformation = page.locator('.summary_info_label');
        this.finishButton = page.locator('#finish');
        this.completeHeader = page.locator('.complete-header');
this.backHomeButton = page.locator('#back-to-products');
    }

    async fillYourInformation(firstName: string, lastName: string, zipCode) {
        await this.firstNameField.fill(firstName);
        await this.lastNameField.fill(lastName);
        await this.zipCodeField.fill(zipCode);
    }
}