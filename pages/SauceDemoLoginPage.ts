import { Locator, Page } from '@playwright/test';
import { BasePage } from './BasePage';

export class SauceDemoLoginPage extends BasePage {
  private userName: Locator;
  private password: Locator;
  private loginButton: Locator;

  constructor(page: Page) {
    super(page);
    this.userName = page.locator('#user-name');
    this.password = page.locator('#password');
    this.loginButton = page.locator('#login-button');
  }

  public async navigate() {
    await this.webPageUtils.navigate('https://www.saucedemo.com/');
  }

  public async login(username: string, password: string) {
    await this.webActionUtils.fill(this.userName, username);
    await this.webActionUtils.fill(this.password, password);
    await this.webActionUtils.click(this.loginButton);
  }
}
