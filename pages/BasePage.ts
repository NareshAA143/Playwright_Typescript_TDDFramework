import { Page } from '@playwright/test';
import { WebActionUtils } from '../utils/WebActionUtils';
import { WebPageUtils } from '../utils/WebPageUtils';

export abstract class BasePage {
  protected page: Page;
  protected webActionUtils: WebActionUtils;
  protected webPageUtils: WebPageUtils;
  protected webElementUtils: WebActionUtils;

  constructor(page: Page) {
    this.page = page;
    this.webActionUtils = new WebActionUtils();
    this.webPageUtils = new WebPageUtils(page);
    this.webElementUtils = new WebActionUtils();
  }
}
