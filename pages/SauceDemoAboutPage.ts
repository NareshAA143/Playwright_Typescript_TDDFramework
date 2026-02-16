import { expect, Locator, Page } from '@playwright/test';
import { BasePage } from './BasePage';

export class SauceDemoAboutPage extends BasePage {
    private requestADemo: Locator;

    constructor(page: Page) {
        super(page);
        this.requestADemo = this.page.locator('//div[@class="MuiBox-root css-1ay9vb9"]/child::a/child::button')
    }
    public async VerifyRequestADemo(){
        await expect(this.requestADemo).toBeVisible();
    }

}