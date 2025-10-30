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

test.describe('Register User with Existing Email Flow', () => {
  let homePage: AutomationExerciseHomePage;
  let signupLoginPage: SignupLoginPage;
  let signupPage: SignupPage;
  let accountCreatedPage: AccountCreatedPage;
  let existingEmail: string;
  let existingUsername: string;
  let newUsername: string;

  test.beforeEach(async ({ page }) => {
    homePage = new AutomationExerciseHomePage(page);
    signupLoginPage = new SignupLoginPage(page);
    signupPage = new SignupPage(page);
    accountCreatedPage = new AccountCreatedPage(page);
    
    existingUsername = generateRandomName();
    existingEmail = generateRandomEmail();
    newUsername = generateRandomName();
  });

  test('should display error when trying to signup with an already registered email', async ({ page }) => {
    await test.step('Launch browser and navigate to home page', async () => {
      await homePage.goto();
      await expect(page).toHaveURL(URL_PATTERNS.HOME);
    });

    await test.step('Verify home page is visible (logo, navigation, banners)', async () => {
      const isHomePageDisplayed = await homePage.isDisplayed();
      expect(isHomePageDisplayed).toBeTruthy();
      
      const isLogoVisible = await homePage.isLogoVisible();
      expect(isLogoVisible).toBeTruthy();
    });

    await test.step('Click on Signup/Login button', async () => {
      await homePage.clickSignupLogin();
      await expect(page).toHaveURL(URL_PATTERNS.LOGIN);
    });

    await test.step('Verify New User Signup! is visible', async () => {
      const isNewUserSignupVisible = await signupLoginPage.isNewUserSignupVisible();
      expect(isNewUserSignupVisible).toBeTruthy();
    });

    await test.step('Register a new user with unique email (setup for existing email)', async () => {
      await signupLoginPage.fillSignupForm(existingUsername, existingEmail);
      await signupLoginPage.clickSignup();
      await expect(page).toHaveURL(URL_PATTERNS.SIGNUP);
      
      await signupPage.selectTitle('Mr');
      await signupPage.fillPassword(generateRandomPassword());
      await signupPage.selectDateOfBirth('15', 'June', '1990');
      await signupPage.checkNewsletter();
      await signupPage.checkOffers();
      
      const address = generateRandomAddress();
      await signupPage.fillAddressInformation({
        firstName: existingUsername.split(' ')[0],
        lastName: existingUsername.split(' ')[1] || 'User',
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

    await test.step('Logout from the account', async () => {
      await page.locator('a[href="/logout"]').click();
      await expect(page).toHaveURL(URL_PATTERNS.LOGIN);
    });

    await test.step('Verify New User Signup! is visible', async () => {
      await page.waitForSelector(LOCATORS.SIGNUP_LOGIN.NEW_USER_HEADER, { state: 'visible' });
      const isNewUserSignupVisible = await signupLoginPage.isNewUserSignupVisible();
      expect(isNewUserSignupVisible).toBeTruthy();
    });

    await test.step('Enter name and already registered email address', async () => {
      await signupLoginPage.fillSignupForm(newUsername, existingEmail);
    });

    await test.step('Click Signup button', async () => {
      await signupLoginPage.clickSignup();
    });

    await test.step('Verify error "Email Address already exist!" is visible', async () => {
      await expect(page).toHaveURL(URL_PATTERNS.SIGNUP);
      
      const isErrorVisible = await signupLoginPage.isSignupErrorVisible();
      expect(isErrorVisible).toBeTruthy();
      
      const errorMessage = await signupLoginPage.getSignupErrorMessage();
      expect(errorMessage).toContain('Email Address already exist!');
    });
  });
});
