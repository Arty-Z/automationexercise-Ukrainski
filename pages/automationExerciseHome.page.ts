import { Page, Locator } from '@playwright/test';
import { LOCATORS } from '../utils/locators';

export class AutomationExerciseHomePage {
  readonly page: Page;
  readonly logo: Locator;
  readonly navBar: Locator;
  readonly signupLoginButton: Locator;
  readonly loggedInAsText: Locator;
  readonly deleteAccountButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.logo = page.locator(LOCATORS.HOME.LOGO);
    this.navBar = page.locator(LOCATORS.HOME.NAV_BAR);
    this.signupLoginButton = page.locator(LOCATORS.HOME.SIGNUP_LOGIN_LINK);
    this.loggedInAsText = page.locator(LOCATORS.HOME.LOGGED_IN_TEXT);
    this.deleteAccountButton = page.locator(LOCATORS.HOME.DELETE_ACCOUNT_LINK);
  }

  async goto() {
    await this.page.goto('/');
  }

  async isDisplayed(): Promise<boolean> {
    return await this.page.locator('body').isVisible();
  }

  async isLogoVisible(): Promise<boolean> {
    return await this.logo.isVisible();
  }

  async isNavBarVisible(): Promise<boolean> {
    return await this.navBar.isVisible();
  }

  async clickSignupLogin() {
    await this.signupLoginButton.click();
  }

  async verifyLoggedInAs(username: string): Promise<boolean> {
    const text = await this.loggedInAsText.textContent();
    return text?.includes(username) || false;
  }

  async isLoggedInVisible(): Promise<boolean> {
    return await this.loggedInAsText.isVisible();
  }

  async clickDeleteAccount() {
    await this.deleteAccountButton.click();
  }
}
