import { test, expect } from '@playwright/test';
import { AutomationExerciseHomePage } from '../../pages/automationExerciseHome.page';
import { SignupLoginPage } from '../../pages/signupLogin.page';
import { SignupPage } from '../../pages/signup.page';
import { AccountCreatedPage } from '../../pages/accountCreated.page';
import { LOCATORS } from '../../utils/locators';
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
} as const;

test.describe('Logout User Flow', () => {
  let homePage: AutomationExerciseHomePage;
  let signupLoginPage: SignupLoginPage;
  let signupPage: SignupPage;
  let accountCreatedPage: AccountCreatedPage;
  let testEmail: string;
  let testPassword: string;
  let testUsername: string;

  test.beforeEach(async ({ page }) => {
    homePage = new AutomationExerciseHomePage(page);
    signupLoginPage = new SignupLoginPage(page);
    signupPage = new SignupPage(page);
    accountCreatedPage = new AccountCreatedPage(page);
    
    testUsername = generateRandomName();
    testEmail = generateRandomEmail();
    testPassword = generateRandomPassword();
  });

  test('should register user, login and logout successfully', async ({ page }) => {
    await test.step('Launch browser and navigate to home page', async () => {
      await homePage.goto();
      await expect(page).toHaveURL(URL_PATTERNS.HOME);
    });

    await test.step('Verify home page is visible (logo, navigation bar, banners)', async () => {
      const isHomePageDisplayed = await homePage.isDisplayed();
      expect(isHomePageDisplayed).toBeTruthy();
      
      const isLogoVisible = await homePage.isLogoVisible();
      expect(isLogoVisible).toBeTruthy();
    });

    await test.step('Click on Signup/Login button', async () => {
      await homePage.clickSignupLogin();
      await expect(page).toHaveURL(URL_PATTERNS.LOGIN);
    });

    await test.step('Register a new user', async () => {
      await signupLoginPage.fillSignupForm(testUsername, testEmail);
      await signupLoginPage.clickSignup();
      await expect(page).toHaveURL(URL_PATTERNS.SIGNUP);
      
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
      
      const isAccountCreatedVisible = await accountCreatedPage.isAccountCreatedVisible();
      expect(isAccountCreatedVisible).toBeTruthy();
      
      await accountCreatedPage.clickContinue();
      await expect(page).toHaveURL(URL_PATTERNS.HOME);
    });

    await test.step('Verify Logged in as [username] is visible in header', async () => {
      await page.waitForSelector(LOCATORS.HOME.LOGGED_IN_TEXT, { state: 'visible' });
      const isLoggedIn = await homePage.isLoggedInVisible();
      expect(isLoggedIn).toBeTruthy();
      
      const verifyLoggedInAs = await homePage.verifyLoggedInAs(testUsername);
      expect(verifyLoggedInAs).toBeTruthy();
    });

    await test.step('Click Logout button', async () => {
      await page.locator('a[href="/logout"]').click();
      await expect(page).toHaveURL(URL_PATTERNS.LOGIN);
    });

    await test.step('Verify user is navigated back to the Login page', async () => {
      await page.waitForSelector(LOCATORS.SIGNUP_LOGIN.LOGIN_HEADER, { state: 'visible' });
      const isLoginHeaderVisible = await signupLoginPage.isLoginHeaderVisible();
      expect(isLoginHeaderVisible).toBeTruthy();
    });
  });
});
