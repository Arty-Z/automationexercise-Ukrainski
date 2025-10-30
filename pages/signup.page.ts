import { Page, Locator } from '@playwright/test';
import { LOCATORS } from '../utils/locators';

export class SignupPage {
  readonly page: Page;
  readonly accountInfoHeader: Locator;
  readonly titleMr: Locator;
  readonly titleMrs: Locator;
  readonly nameInput: Locator;
  readonly emailInput: Locator;
  readonly passwordInput: Locator;
  readonly dayDropdown: Locator;
  readonly monthDropdown: Locator;
  readonly yearDropdown: Locator;
  readonly newsletterCheckbox: Locator;
  readonly offersCheckbox: Locator;
  readonly firstNameInput: Locator;
  readonly lastNameInput: Locator;
  readonly companyInput: Locator;
  readonly address1Input: Locator;
  readonly address2Input: Locator;
  readonly countryDropdown: Locator;
  readonly stateInput: Locator;
  readonly cityInput: Locator;
  readonly zipcodeInput: Locator;
  readonly mobileNumberInput: Locator;
  readonly createAccountButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.accountInfoHeader = page.locator(LOCATORS.SIGNUP.ACCOUNT_INFO_HEADER);
    this.titleMr = page.locator(LOCATORS.SIGNUP.TITLE_MR);
    this.titleMrs = page.locator(LOCATORS.SIGNUP.TITLE_MRS);
    this.nameInput = page.locator(LOCATORS.SIGNUP.NAME_INPUT);
    this.emailInput = page.locator(LOCATORS.SIGNUP.EMAIL_INPUT);
    this.passwordInput = page.locator(LOCATORS.SIGNUP.PASSWORD_INPUT);
    this.dayDropdown = page.locator(LOCATORS.SIGNUP.DAY_DROPDOWN);
    this.monthDropdown = page.locator(LOCATORS.SIGNUP.MONTH_DROPDOWN);
    this.yearDropdown = page.locator(LOCATORS.SIGNUP.YEAR_DROPDOWN);
    this.newsletterCheckbox = page.locator(LOCATORS.SIGNUP.NEWSLETTER_CHECKBOX);
    this.offersCheckbox = page.locator(LOCATORS.SIGNUP.OFFERS_CHECKBOX);
    this.firstNameInput = page.locator(LOCATORS.SIGNUP.FIRST_NAME_INPUT);
    this.lastNameInput = page.locator(LOCATORS.SIGNUP.LAST_NAME_INPUT);
    this.companyInput = page.locator(LOCATORS.SIGNUP.COMPANY_INPUT);
    this.address1Input = page.locator(LOCATORS.SIGNUP.ADDRESS1_INPUT);
    this.address2Input = page.locator(LOCATORS.SIGNUP.ADDRESS2_INPUT);
    this.countryDropdown = page.locator(LOCATORS.SIGNUP.COUNTRY_DROPDOWN);
    this.stateInput = page.locator(LOCATORS.SIGNUP.STATE_INPUT);
    this.cityInput = page.locator(LOCATORS.SIGNUP.CITY_INPUT);
    this.zipcodeInput = page.locator(LOCATORS.SIGNUP.ZIPCODE_INPUT);
    this.mobileNumberInput = page.locator(LOCATORS.SIGNUP.MOBILE_INPUT);
    this.createAccountButton = page.locator(LOCATORS.SIGNUP.CREATE_ACCOUNT_BUTTON);
  }

  async isAccountInfoVisible(): Promise<boolean> {
    return await this.accountInfoHeader.isVisible();
  }

  async selectTitle(title: 'Mr' | 'Mrs') {
    if (title === 'Mr') {
      await this.titleMr.check();
    } else {
      await this.titleMrs.check();
    }
  }

  async verifyName(expectedName: string): Promise<boolean> {
    const value = await this.nameInput.inputValue();
    return value === expectedName;
  }

  async verifyEmail(expectedEmail: string): Promise<boolean> {
    const value = await this.emailInput.inputValue();
    return value === expectedEmail;
  }

  async fillPassword(password: string) {
    await this.passwordInput.fill(password);
  }

  async selectDateOfBirth(day: string, month: string, year: string) {
    await this.dayDropdown.selectOption(day);
    await this.monthDropdown.selectOption(month);
    await this.yearDropdown.selectOption(year);
  }

  async checkNewsletter() {
    await this.newsletterCheckbox.check();
  }

  async checkOffers() {
    await this.offersCheckbox.check();
  }

  async fillAddressInformation(addressData: {
    firstName: string;
    lastName: string;
    company: string;
    address1: string;
    address2: string;
    country: string;
    state: string;
    city: string;
    zipcode: string;
    mobileNumber: string;
  }) {
    await this.firstNameInput.fill(addressData.firstName);
    await this.lastNameInput.fill(addressData.lastName);
    await this.companyInput.fill(addressData.company);
    await this.address1Input.fill(addressData.address1);
    await this.address2Input.fill(addressData.address2);
    await this.countryDropdown.selectOption(addressData.country);
    await this.stateInput.fill(addressData.state);
    await this.cityInput.fill(addressData.city);
    await this.zipcodeInput.fill(addressData.zipcode);
    await this.mobileNumberInput.fill(addressData.mobileNumber);
  }

  async clickCreateAccount() {
    await this.createAccountButton.click();
  }
}
