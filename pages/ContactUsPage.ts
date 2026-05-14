import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';

export class ContactUsPage extends BasePage {
  readonly nameInput: Locator;
  readonly emailInput: Locator;
  readonly subjectInput: Locator;
  readonly messageInput: Locator;
  readonly submitBtn: Locator;
  readonly successMsg: Locator;

  constructor(page: Page) {
    super(page);
    this.nameInput = page.locator('[data-qa="name"]');
    this.emailInput = page.locator('[data-qa="email"]');
    this.subjectInput = page.locator('[data-qa="subject"]');
    this.messageInput = page.locator('[data-qa="message"]');
    this.submitBtn = page.locator('[data-qa="submit-button"]');
    this.successMsg = page.locator('.contact-form .alert-success');
  }
  async goto() {
    await this.navigateTo('/contact_us');
  }
  async submitForm(name: string, email: string, subject: string, message: string) {
    await this.nameInput.fill(name);
    await this.emailInput.fill(email);
    await this.subjectInput.fill(subject);
    await this.messageInput.fill(message);
    this.page.once('dialog', d => d.accept());
    await this.submitBtn.click();
  }
}