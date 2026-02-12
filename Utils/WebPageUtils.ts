import { Page, expect } from '@playwright/test';

export class WebPageUtils {
  constructor(private page: Page) {}

  // ----------------------
  // NAVIGATION
  // ----------------------
  async navigate(url: string) {
  await this.page.goto(url, { waitUntil: 'networkidle', timeout: 60000 });
}
  async goBack() {
    await this.page.goBack();
  }

  async goForward() {
    await this.page.goForward();
  }

  async reload() {
    await this.page.reload();
  }

  async refresh() {
    await this.page.reload();
  }

  async verifyURL(expectedUrl: string) {
    await expect(this.page).toHaveURL(expectedUrl);
  }

  async waitForURL(expectedUrl: string, timeout?: number) {
    await this.page.waitForURL(expectedUrl, { timeout });
  }

  async getCurrentURL(): Promise<string> {
    return this.page.url();
  }

  // ----------------------
  // PAGE INFO
  // ----------------------
  async getTitle(): Promise<string> {
    return this.page.title();
  }

  async getContent(): Promise<string> {
    return this.page.content();
  }

  async getViewportSize() {
    return this.page.viewportSize();
  }

  async setViewportSize(width: number, height: number) {
    await this.page.setViewportSize({ width, height });
  }

  async getCookies() {
    return this.page.context().cookies();
  }

  async clearCookies() {
    await this.page.context().clearCookies();
  }

  async getLocalStorageItem(key: string) {
    return this.page.evaluate((k) => localStorage.getItem(k), key);
  }

  async setLocalStorageItem(key: string, value: string) {
    await this.page.evaluate(
      ([k, v]) => localStorage.setItem(k, v),
      [key, value]
    );
  }

  async removeLocalStorageItem(key: string) {
    await this.page.evaluate((k) => localStorage.removeItem(k), key);
  }

  async clearLocalStorage() {
    await this.page.evaluate(() => localStorage.clear());
  }

  // ----------------------
  // ALERTS / DIALOGS
  // ----------------------
  async acceptAlert() {
    this.page.once('dialog', async (dialog) => {
      await dialog.accept();
    });
  }

  async dismissAlert() {
    this.page.once('dialog', async (dialog) => {
      await dialog.dismiss();
    });
  }

  async getAlertText(): Promise<string> {
    return new Promise((resolve) => {
      this.page.once('dialog', async (dialog) => {
        resolve(dialog.message());
        await dialog.dismiss();
      });
    });
  }

  // ----------------------
  // WAIT / SYNCHRONIZATION
  // ----------------------
  async waitForTimeout(ms: number) {
    await this.page.waitForTimeout(ms);
  }

  async waitForLoadState(state: 'load' | 'domcontentloaded' | 'networkidle' = 'load') {
    await this.page.waitForLoadState(state);
  }

  async waitForSelector(selector: string, timeout?: number) {
    await this.page.waitForSelector(selector, { timeout });
  }


  // ----------------------
  // SCROLL
  // ----------------------
  async scrollToTop() {
    await this.page.evaluate(() => window.scrollTo(0, 0));
  }

  async scrollToBottom() {
    await this.page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
  }

  async scrollBy(x: number, y: number) {
    await this.page.evaluate(([dx, dy]) => window.scrollBy(dx, dy), [x, y]);
  }

  // ----------------------
  // SCREENSHOTS / PDF / RECORDING
  // ----------------------
  async takeScreenshot(path: string, fullPage: boolean = true) {
    await this.page.screenshot({ path, fullPage });
  }

  async takeScreenshotBuffer(fullPage: boolean = true): Promise<Buffer> {
    return await this.page.screenshot({ fullPage });
  }

  // ----------------------
  // FRAMES
  // ----------------------
  async getFrameByName(name: string) {
    return this.page.frame({ name });
  }

  async getFrameByURL(url: string) {
    return this.page.frame({ url });
  }

  async switchToFrame(frameLocator: string) {
    return this.page.frameLocator(frameLocator);
  }

  // ----------------------
  // ASSERTIONS
  // ----------------------
  async expectTitle(expectedTitle: string) {
    await expect(this.page).toHaveTitle(expectedTitle);
  }

  async expectURLContains(partialUrl: string) {
    await expect(this.page).toHaveURL(new RegExp(partialUrl));
  }
}
