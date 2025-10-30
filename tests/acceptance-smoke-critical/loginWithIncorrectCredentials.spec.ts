import { test, expect } from '@playwright/test';
import { AutomationExerciseHomePage } from '../../pages/automationExerciseHome.page';
import { SignupLoginPage } from '../../pages/signupLogin.page';
import { generateRandomEmail, generateRandomPassword } from '../../utils/helper';

const URL_PATTERNS = {
  HOME: /automationexercise/,
  LOGIN: /login/,
} as const;

test.describe('Login with Incorrect Credentials Flow', () => {
  let homePage: AutomationExerciseHomePage;
  let signupLoginPage: SignupLoginPage;
  let incorrectEmail: string;
  let incorrectPassword: string;

  test.beforeEach(async ({ page }) => {
    homePage = new AutomationExerciseHomePage(page);
    signupLoginPage = new SignupLoginPage(page);
    
    incorrectEmail = generateRandomEmail();
    incorrectPassword = generateRandomPassword();
  });

  test('should display error message when logging in with incorrect credentials', async ({ page }) => {
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

    await test.step('Verify Login to your account is visible', async () => {
      const isLoginHeaderVisible = await signupLoginPage.isLoginHeaderVisible();
      expect(isLoginHeaderVisible).toBeTruthy();
    });

    await test.step('Enter incorrect email address and incorrect password', async () => {
      await signupLoginPage.fillLoginForm(incorrectEmail, incorrectPassword);
    });

    await test.step('Click Login button', async () => {
      await signupLoginPage.clickLogin();
    });

    await test.step('Verify error message "Your email or password is incorrect!" is visible', async () => {
      const isErrorMessageVisible = await signupLoginPage.isLoginErrorVisible();
      expect(isErrorMessageVisible).toBeTruthy();
      
      const errorMessage = await signupLoginPage.getLoginErrorMessage();
      expect(errorMessage).toContain('Your email or password is incorrect!');
    });
  });
});
