import { Page, Locator } from '@playwright/test';
import { LOCATORS } from '../utils/locators';

export class AccountDeletedPage {
  readonly page: Page;
  readonly accountDeletedHeader: Locator;
  readonly continueButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.accountDeletedHeader = page.locator(LOCATORS.ACCOUNT_DELETED.HEADER);
    this.continueButton = page.locator(LOCATORS.ACCOUNT_DELETED.CONTINUE_BUTTON);
  }

  async isAccountDeletedVisible(): Promise<boolean> {
    return await this.accountDeletedHeader.isVisible();
  }

  async clickContinue() {
    await this.continueButton.click();
  }
}
