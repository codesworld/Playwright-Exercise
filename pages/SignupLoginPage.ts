import {Page, Locator, expect} from '@playwright/test';
import {BasePage} from './BasePage';

export class SignupLoginPage extends BasePage {

readonly signupNameInput: Locator;
readonly signupEmailInput: Locator;
readonly signupBtn: Locator;
readonly loginEmailInput: Locator;
readonly loginPasswordInput: Locator;
readonly loginBtn: Locator;
readonly signupTitle: Locator;
readonly loginTitle: Locator;
readonly signupErrorMessage =
  this.page.getByText('Email Address already exist!');
 constructor(page:Page){
    super(page);
    this.signupNameInput = page.locator('[data-qa="signup-name"]');
    this.signupEmailInput = page.locator('[data-qa="signup-email"]');
    this.signupBtn = page.locator('[data-qa="signup-button"]');
    this.loginEmailInput = page.locator('[data-qa="login-email"]');
    this.loginPasswordInput = page.locator('[data-qa="login-password"]');
    this.loginBtn = page.locator('[data-qa="login-button"]');
    this.signupTitle = page.locator('h2.title.text-center').filter({ hasText: 'New User Signup!' });
    this.loginTitle = page.locator('h2.title.text-center').filter({ hasText: 'Login to your account' });
 }
  async goto(): Promise<void>{
    await this.navigateTo('/login');
  }
 
  async login(email: string, password: string): Promise<void> {
    await this.loginEmailInput.fill(email);
    await this.loginPasswordInput.fill(password);
    await this.loginBtn.click();
  }

  async startSignup(name: string, email: string): Promise<void> {
    await this.signupNameInput.fill(name);
    await this.signupEmailInput.fill(email);
    await this.signupBtn.click();
  }
}
