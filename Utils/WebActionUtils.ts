import { Locator, expect, Page, ElementHandle } from '@playwright/test';

export class WebActionUtils {
  
  // ----------------------
  // BASIC ELEMENT ACTIONS
  // ----------------------

  async click(locator: Locator) {
  await locator.click();
}

async forceclick(locator: Locator) {
    await locator.waitFor({ state: 'visible', timeout: 5000 });
    await locator.click({ force: true, timeout: 5000 }); // Force click
}


  async doubleClick(locator: Locator) {
    await locator.dblclick();
  }

  async rightClick(locator: Locator) {
    await locator.click({ button: 'right' });
  }

async fill(locator: Locator, value: string) {
  await locator.waitFor({ state: 'visible', timeout: 15000 });
  await locator.fill(value);
}


  async clear(locator: Locator) {
    await locator.fill('');
  }

  async hover(locator: Locator) {
    await locator.hover();
  }

  async pressKey(locator: Locator, key: string) {
    await locator.press(key);
  }

  async focus(locator: Locator) {
    await locator.focus();
  }

  async type(locator: Locator, text: string, delay?: number) {
    await locator.type(text, { delay });
  }

  async scrollIntoView(locator: Locator) {
    await locator.scrollIntoViewIfNeeded();
  }

  // ----------------------
  // CHECKBOX / RADIO BUTTON
  // ----------------------

  async check(locator: Locator) {
    await locator.check();
  }

  async uncheck(locator: Locator) {
    await locator.uncheck();
  }

  async selectRadio(locator: Locator) {
    await locator.check();
  }

  // ----------------------
  // DROPDOWN / SELECT
  // ----------------------

  async selectByValue(locator: Locator, value: string) {
    await locator.selectOption({ value });
  }

  async selectByLabel(locator: Locator, label: string) {
    await locator.selectOption({ label });
  }

  async selectByIndex(locator: Locator, index: number) {
    await locator.selectOption({ index });
  }

  async getSelectedOptions(locator: Locator): Promise<string[]> {
    const values = await locator.evaluateAll(
      (elements: HTMLSelectElement[]) =>
        Array.from(elements)
          .map((el) => Array.from(el.selectedOptions).map((o) => o.value))
          .flat()
    );
    return values;
  }

  // ----------------------
  // ELEMENT INFO
  // ----------------------

  async getText(locator: Locator): Promise<string> {
    return (await locator.textContent()) || '';
  }
   async getAllText(locator: Locator): Promise<string[]> {
    return (await locator.allTextContents()) || '';
  }

  async getAttribute(locator: Locator, attr: string): Promise<string | null> {
    return await locator.getAttribute(attr);
  }

  async getValue(locator: Locator): Promise<string> {
    return (await locator.inputValue()) || '';
  }

  async count(locator: Locator): Promise<number> {
    return await locator.count();
  }

  async isVisible(locator: Locator): Promise<boolean> {
    return await locator.isVisible();
  }

  async isEnabled(locator: Locator): Promise<boolean> {
    return await locator.isEnabled();
  }

  async isChecked(locator: Locator): Promise<boolean> {
    return await locator.isChecked();
  }

  // ----------------------
  // ASSERTIONS
  // ----------------------

  async expectText(locator: Locator, expected: string) {
    await expect(locator).toHaveText(expected);
  }

  async expectTextContains(locator: Locator, expected: string) {
    await expect(locator).toContainText(expected);
  }

  async expectVisible(locator: Locator) {
    await expect(locator).toBeVisible();
  }

  async expectHidden(locator: Locator) {
    await expect(locator).toBeHidden();
  }

  async expectEnabled(locator: Locator) {
    await expect(locator).toBeEnabled();
  }

  async expectDisabled(locator: Locator) {
    await expect(locator).toBeDisabled();
  }

  async expectChecked(locator: Locator) {
    await expect(locator).toBeChecked();
  }

  async expectUnchecked(locator: Locator) {
    await expect(locator).not.toBeChecked();
  }

  async expectCount(locator: Locator, expected: number) {
    await expect(locator).toHaveCount(expected);
  }

  // ----------------------
  // DRAG & DROP
  // ----------------------

  async dragAndDrop(source: Locator, target: Locator) {
    await source.dragTo(target);
  }

  // ----------------------
  // FILE UPLOAD / DOWNLOAD
  // ----------------------

  async uploadFile(locator: Locator, filePath: string) {
    await locator.setInputFiles(filePath);
  }

  async uploadMultipleFiles(locator: Locator, filePaths: string[]) {
    await locator.setInputFiles(filePaths);
  }

  async downloadFile(locator: Locator, page: Page, saveAs?: string) {
    const [download] = await Promise.all([
      page.waitForEvent('download'),
      locator.click(),
    ]);
    if (saveAs) {
      await download.saveAs(saveAs);
    } else {
      await download.path(); // returns temp path
    }
    return download;
  }

  // ----------------------
  // MOUSE / SCROLL ACTIONS
  // ----------------------

  async scrollBy(page: Page, x: number, y: number) {
    await page.evaluate(([dx, dy]) => window.scrollBy(dx, dy), [x, y]);
  }

  async scrollToTop(page: Page) {
    await page.evaluate(() => window.scrollTo(0, 0));
  }

  async scrollToBottom(page: Page) {
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
  }

  // ----------------------
  // FRAME / ELEMENT HANDLE
  // ----------------------

  async getElementHandle(locator: Locator): Promise<ElementHandle<HTMLElement>> {
    return await locator.elementHandle() as ElementHandle<HTMLElement>;
  }

  async frameLocator(locator: Locator) {
    return locator.frameLocator('');
  }
}
