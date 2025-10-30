import { test, expect } from '@playwright/test';
import { AutomationExerciseHomePage } from '../../pages/automationExerciseHome.page';
import { SignupLoginPage } from '../../pages/signupLogin.page';
import { SignupPage } from '../../pages/signup.page';
import { AccountCreatedPage } from '../../pages/accountCreated.page';
import { AccountDeletedPage } from '../../pages/accountDeleted.page';
import {
  generateRandomName,
  generateRandomEmail,
  generateRandomPassword,
  generateRandomDOB,
  generateRandomFirstName,
  generateRandomLastName,
  generateRandomCompany,
  generateRandomAddress,
  COUNTRIES
} from '../../utils/helper';

const URL_PATTERNS = {
  HOME: /automationexercise/,
  LOGIN: /login/,
  SIGNUP: /signup/,
  ACCOUNT_CREATED: /account_created/,
  DELETE_ACCOUNT: /delete_account/,
} as const;

const TITLES = {
  MR: 'Mr',
  MRS: 'Mrs',
} as const;

test.describe('User Registration Flow', () => {
  let homePage: AutomationExerciseHomePage;
  let signupLoginPage: SignupLoginPage;
  let signupPage: SignupPage;
  let accountCreatedPage: AccountCreatedPage;
  let accountDeletedPage: AccountDeletedPage;

  let userName: string;
  let userEmail: string;
  let userPassword: string;
  let dob: { day: string; month: string; year: string };
  let addressData: {
    firstName: string;
    lastName: string;
    company: string;
    address1: string;
    address2: string;
    city: string;
    state: string;
    zipcode: string;
    mobileNumber: string;
  };

  test.beforeEach(async ({ page }) => {
    homePage = new AutomationExerciseHomePage(page);
    signupLoginPage = new SignupLoginPage(page);
    signupPage = new SignupPage(page);
    accountCreatedPage = new AccountCreatedPage(page);
    accountDeletedPage = new AccountDeletedPage(page);

    userName = generateRandomName();
    userEmail = generateRandomEmail();
    userPassword = generateRandomPassword();
    dob = generateRandomDOB();
    const address = generateRandomAddress();
    
    addressData = {
      firstName: generateRandomFirstName(),
      lastName: generateRandomLastName(),
      company: generateRandomCompany(),
      address1: address.address1,
      address2: address.address2,
      city: address.city,
      state: address.state,
      zipcode: address.zipcode,
      mobileNumber: address.mobileNumber
    };
  });

  test('should complete full user registration and account deletion flow', async ({ page }) => {
    await homePage.goto();
    await expect(page).toHaveURL(URL_PATTERNS.HOME);
    const isHomePageDisplayed = await homePage.isDisplayed();
    expect(isHomePageDisplayed).toBeTruthy();

    await homePage.clickSignupLogin();
    await expect(page).toHaveURL(URL_PATTERNS.LOGIN);

    const isNewUserSignupVisible = await signupLoginPage.isNewUserSignupVisible();
    expect(isNewUserSignupVisible).toBeTruthy();

    await signupLoginPage.fillSignupForm(userName, userEmail);
    await signupLoginPage.clickSignup();
    await expect(page).toHaveURL(URL_PATTERNS.SIGNUP);

    const isAccountInfoVisible = await signupPage.isAccountInfoVisible();
    expect(isAccountInfoVisible).toBeTruthy();

    await signupPage.selectTitle(TITLES.MR as 'Mr');

    const nameMatches = await signupPage.verifyName(userName);
    expect(nameMatches).toBeTruthy();

    const emailMatches = await signupPage.verifyEmail(userEmail);
    expect(emailMatches).toBeTruthy();

    await signupPage.fillPassword(userPassword);
    await signupPage.selectDateOfBirth(dob.day, dob.month, dob.year);
    await signupPage.checkNewsletter();
    await signupPage.checkOffers();

    await signupPage.fillAddressInformation({
      ...addressData,
      country: COUNTRIES.US
    });

    await signupPage.clickCreateAccount();
    await expect(page).toHaveURL(URL_PATTERNS.ACCOUNT_CREATED);

    const isAccountCreatedVisible = await accountCreatedPage.isAccountCreatedVisible();
    expect(isAccountCreatedVisible).toBeTruthy();

    await accountCreatedPage.clickContinue();
    await expect(page).toHaveURL(URL_PATTERNS.HOME);

    const isLoggedIn = await homePage.verifyLoggedInAs(userName);
    expect(isLoggedIn).toBeTruthy();

    await homePage.clickDeleteAccount();
    await expect(page).toHaveURL(URL_PATTERNS.DELETE_ACCOUNT);

    const isAccountDeletedVisible = await accountDeletedPage.isAccountDeletedVisible();
    expect(isAccountDeletedVisible).toBeTruthy();

    await accountDeletedPage.clickContinue();
    await expect(page).toHaveURL(URL_PATTERNS.HOME);
  });
});
