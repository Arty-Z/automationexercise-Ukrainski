import { Page, Locator } from '@playwright/test';
import { LOCATORS } from '../utils/locators';

export class SignupLoginPage {
  readonly page: Page;
  readonly newUserSignupHeader: Locator;
  readonly signupNameInput: Locator;
  readonly signupEmailInput: Locator;
  readonly signupButton: Locator;
  readonly loginHeader: Locator;
  readonly loginEmailInput: Locator;
  readonly loginPasswordInput: Locator;
  readonly loginButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.newUserSignupHeader = page.locator(LOCATORS.SIGNUP_LOGIN.NEW_USER_HEADER);
    this.signupNameInput = page.locator(LOCATORS.SIGNUP_LOGIN.SIGNUP_NAME_INPUT);
    this.signupEmailInput = page.locator(LOCATORS.SIGNUP_LOGIN.SIGNUP_EMAIL_INPUT);
    this.signupButton = page.locator(LOCATORS.SIGNUP_LOGIN.SIGNUP_BUTTON);
    this.loginHeader = page.locator(LOCATORS.SIGNUP_LOGIN.LOGIN_HEADER);
    this.loginEmailInput = page.locator(LOCATORS.SIGNUP_LOGIN.LOGIN_EMAIL_INPUT);
    this.loginPasswordInput = page.locator(LOCATORS.SIGNUP_LOGIN.LOGIN_PASSWORD_INPUT);
    this.loginButton = page.locator(LOCATORS.SIGNUP_LOGIN.LOGIN_BUTTON);
  }

  async isNewUserSignupVisible(): Promise<boolean> {
    return await this.newUserSignupHeader.isVisible();
  }

  async fillSignupForm(name: string, email: string) {
    await this.signupNameInput.fill(name);
    await this.signupEmailInput.fill(email);
  }

  async clickSignup() {
    await this.signupButton.click();
  }

  async isLoginHeaderVisible(): Promise<boolean> {
    return await this.loginHeader.isVisible();
  }

  async fillLoginForm(email: string, password: string) {
    await this.loginEmailInput.fill(email);
    await this.loginPasswordInput.fill(password);
  }

  async clickLogin() {
    await this.loginButton.click();
  }
}
