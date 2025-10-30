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

test.describe('Login and Delete Account Flow', () => {
  let homePage: AutomationExerciseHomePage;
  let signupLoginPage: SignupLoginPage;
  let signupPage: SignupPage;
  let accountCreatedPage: AccountCreatedPage;
  let accountDeletedPage: AccountDeletedPage;
  let testEmail: string;
  let testPassword: string;
  let testUsername: string;

  test.beforeEach(async ({ page }) => {
    homePage = new AutomationExerciseHomePage(page);
    signupLoginPage = new SignupLoginPage(page);
    signupPage = new SignupPage(page);
    accountCreatedPage = new AccountCreatedPage(page);
    accountDeletedPage = new AccountDeletedPage(page);
    
    testUsername = generateRandomName();
    testEmail = generateRandomEmail();
    testPassword = generateRandomPassword();
  });

  test('should register new user, logout, login with credentials and delete account', async ({ page }) => {
    await test.step('Launch browser and navigate to home page', async () => {
      await homePage.goto();
      await expect(page).toHaveURL(URL_PATTERNS.HOME);
    });

    await test.step('Verify home page is visible successfully', async () => {
      const isHomePageDisplayed = await homePage.isDisplayed();
      expect(isHomePageDisplayed).toBeTruthy();
      
      const isLogoVisible = await homePage.isLogoVisible();
      expect(isLogoVisible).toBeTruthy();
    });

    await test.step('Click on Signup/Login button', async () => {
      await homePage.clickSignupLogin();
      await expect(page).toHaveURL(URL_PATTERNS.LOGIN);
    });

    await test.step('Fill signup form with new user data', async () => {
      await signupLoginPage.fillSignupForm(testUsername, testEmail);
      await signupLoginPage.clickSignup();
      await expect(page).toHaveURL(URL_PATTERNS.SIGNUP);
    });

    await test.step('Complete registration form', async () => {
      await signupPage.selectTitle('Mr');
      await signupPage.fillPassword(testPassword);
      await signupPage.selectDateOfBirth('15', 'June', '1990');
      await signupPage.checkNewsletter();
      await signupPage.checkOffers();
      
      const address = generateRandomAddress();
      await signupPage.fillAddressInformation({
        firstName: testUsername.split(' ')[0],
        lastName: testUsername.split(' ')[1] || 'User',
        company: 'Test Company',
        address1: address.address1,
        address2: address.address2,
        country: COUNTRIES.US,
        state: address.state,
        city: address.city,
        zipcode: address.zipcode,
        mobileNumber: address.mobileNumber
      });
      
      await signupPage.clickCreateAccount();
      await expect(page).toHaveURL(URL_PATTERNS.ACCOUNT_CREATED);
    });

    await test.step('Verify account created and continue', async () => {
      const isAccountCreatedVisible = await accountCreatedPage.isAccountCreatedVisible();
      expect(isAccountCreatedVisible).toBeTruthy();
      
      await accountCreatedPage.clickContinue();
      await expect(page).toHaveURL(URL_PATTERNS.HOME);
    });

    await test.step('Verify user is logged in after registration', async () => {
      const isLoggedIn = await homePage.isLoggedInVisible();
      expect(isLoggedIn).toBeTruthy();
    });

    await test.step('Logout from the account', async () => {
      await page.locator('a[href="/logout"]').click();
      await expect(page).toHaveURL(URL_PATTERNS.LOGIN);
    });

    await test.step('Verify Login to your account is visible', async () => {
      const isLoginHeaderVisible = await signupLoginPage.isLoginHeaderVisible();
      expect(isLoginHeaderVisible).toBeTruthy();
    });

    await test.step('Enter correct email and password', async () => {
      await signupLoginPage.fillLoginForm(testEmail, testPassword);
    });

    await test.step('Click Login button', async () => {
      await signupLoginPage.clickLogin();
      await expect(page).toHaveURL(URL_PATTERNS.HOME);
    });

    await test.step('Verify Logged in as username in header', async () => {
      const isLoggedInVisible = await homePage.isLoggedInVisible();
      expect(isLoggedInVisible).toBeTruthy();
    });

    await test.step('Click Delete Account button', async () => {
      await homePage.clickDeleteAccount();
      await expect(page).toHaveURL(URL_PATTERNS.DELETE_ACCOUNT);
    });

    await test.step('Verify ACCOUNT DELETED! is visible', async () => {
      const isAccountDeletedVisible = await accountDeletedPage.isAccountDeletedVisible();
      expect(isAccountDeletedVisible).toBeTruthy();
    });
  });
});
