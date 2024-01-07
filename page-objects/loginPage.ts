import { expect, type Locator, type Page } from '@playwright/test';

export class LoginPage {
    readonly page: Page;
    readonly userNameField: Locator;
    readonly passwordField: Locator;
    readonly signInButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.userNameField = page.getByPlaceholder('Username');
        this.passwordField = page.getByPlaceholder('Password');
        this.signInButton = page.locator(`//input[@id="login-button"]`)
    }

    async goto() {
        await this.page.goto('https://www.saucedemo.com/');
    }

    async login(username : string, password : string) {
        await this.userNameField.fill(username);
        await this.passwordField.fill(password);
        await this.signInButton.click();
    } 
}