import { Page, Locator } from '@playwright/test';
import { LOCATORS } from '../utils/locators';

export class AccountCreatedPage {
  readonly page: Page;
  readonly accountCreatedHeader: Locator;
  readonly continueButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.accountCreatedHeader = page.locator(LOCATORS.ACCOUNT_CREATED.HEADER);
    this.continueButton = page.locator(LOCATORS.ACCOUNT_CREATED.CONTINUE_BUTTON);
  }

  async isAccountCreatedVisible(): Promise<boolean> {
    return await this.accountCreatedHeader.isVisible();
  }

  async clickContinue() {
    await this.continueButton.click();
  }
}
