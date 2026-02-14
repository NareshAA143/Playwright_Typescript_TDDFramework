import { Locator, Page,expect } from '@playwright/test';
import { BasePage } from './BasePage';
import console from 'console';

export class AmazonPage extends BasePage {
    private searchBox: Locator;
    //private rowsSuggested: Locator;
    private rowsSuggested: Locator;

    constructor(page: Page) {
        super(page);
        this.page = page;
        this.searchBox = this.page.locator('#twotabsearchtextbox');
        //this.rowsSuggested = this.page.locator('//div[@class="left-pane-results-container"]/child::div/child::div[@class="s-suggestion-container"]/child::div[@aria-label="iphone 15 128+gb"]');
        this.rowsSuggested = this.page.locator('[id*="sac-suggestion-row"]');
    }
    public async navigate(){
        const url = process.env.BASE_URL2;
        if (!url) {
    throw new Error('BASE_URL is not defined in env file');
    }
    await this.webPageUtils.navigate(url);
    }
    public async SearchProdcut(productName: string) {
        await this.webActionUtils.click(this.searchBox);
        await this.webActionUtils.fill(this.searchBox, productName);
        await this.page.waitForSelector('.left-pane-results-container');
        await expect(this.page.locator('.left-pane-results-container')).toBeVisible();
        await this.page.waitForTimeout(2000);
    }
    public async VerifySuggestedProduct() {
        const countOfRows = await this.rowsSuggested.count();
        console.log("countOfRows :", countOfRows);
        expect(await this.rowsSuggested).toHaveCount(20);
        const allRowsText = await this.rowsSuggested.allTextContents();
        console.log("allRowsText :", allRowsText);

    }
    public async VerifyCertainProductInSuggestedList(productName: string) {
        await expect(this.rowsSuggested.filter({ hasText: productName }).first()).toBeVisible();
    }
    public async ClickOnIphone(){
        await this.rowsSuggested.filter({ hasText: 'iphone 17pro max' }).first().click();
    }
    public async ClickOnIPhoneUsingForLoop(){
        const options = await this.rowsSuggested.all();
        for (const option of options) {
            if (await option.textContent() === 'iphone 17pro max') {
                await option.click();
                break;
            }
        }
    }
}