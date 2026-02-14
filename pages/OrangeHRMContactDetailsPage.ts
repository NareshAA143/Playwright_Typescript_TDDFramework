import {Page, Locator} from '@playwright/test';
import {BasePage} from './BasePage';

export class OrangeHRMContactDetailsPage extends BasePage {
    private contactDetails:Locator;

    constructor(page:Page) {
        super(page);
        this.contactDetails = this.page.locator('//a[text()="Contact Details"]');
    }
    public async ClickContactDetails() {
        await this.webActionUtils.click(this.contactDetails);
    }
}