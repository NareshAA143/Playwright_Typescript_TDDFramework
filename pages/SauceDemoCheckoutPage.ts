import { expect, Locator, Page } from '@playwright/test';
import { BasePage } from './BasePage';

export class SauceDemoCheckoutPage extends BasePage {
    private checkoutTitle: Locator;
    private firstName: Locator;
    private lastName: Locator;
    private postalCode: Locator;
    private continueButton: Locator;
    private cancelButton: Locator;
    private errorMessage: Locator;

    constructor(page: Page) {
        super(page);
        this.checkoutTitle = this.page.locator('.title');
        this.firstName = this.page.locator('#first-name');
        this.lastName = this.page.locator('#last-name');
        this.postalCode = this.page.locator('#postal-code');
        this.cancelButton = this.page.locator('#cancel');
        this.continueButton = this.page.locator('#continue');
        this.errorMessage = this.page.locator('.error-message-container.error');
    }

    public async VerifyCheckoutPageURL(URL:string) {
        await this.webPageUtils.verifyURL(URL);
    }
    
    public async fillFirstName(firstName: string) {
        await this.firstName.waitFor({ state: 'visible', timeout: 5000 });
        console.log('FirstName ID:', await this.firstName.getAttribute('id'));
        await this.firstName.fill('');
        await this.firstName.focus();
  await this.webActionUtils.fill(this.firstName, firstName);

  const value = await this.webElementUtils.getValue(this.firstName);
  console.log(`First name: ${value}`);
  expect(value).toBe(firstName);
  await this.page.locator('body').click();
}

public async fillLastName(lastName: string) {
 await this.lastName.waitFor({ state: 'visible', timeout: 5000 });
 console.log('LastName ID:', await this.lastName.getAttribute('id'));
 await this.firstName.fill('');
  await this.webActionUtils.fill(this.lastName, lastName);
  const value = await this.webElementUtils.getValue(this.lastName);
  console.log(`Last name: ${value}`);
  expect(value).toBe(lastName);
  await this.page.locator('body').click();
}

public async fillPostalCode(postalCode: string) {
    await this.postalCode.waitFor({ state: 'visible', timeout: 5000 });
    await this.firstName.fill('');
  await this.webActionUtils.fill(this.postalCode, postalCode);

  const value = await this.webElementUtils.getValue(this.postalCode);
  console.log(`Postal code: ${value}`);
  expect(value).toBe(postalCode);
  await this.page.locator('body').click();
}

    public async ClickOnContinueButton(){
        await this.webActionUtils.click(this.continueButton);
    }

    public async ValidateErrorMessage(errorMessage: string) {
       
        await this.webActionUtils.isVisible(this.errorMessage);
        const value = await this.webElementUtils.getText(this.errorMessage);
        console.log(`Error message: ${value}`);
        expect(value?.trim()).toBe(errorMessage);

    }
}
