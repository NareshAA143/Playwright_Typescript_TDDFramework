import {Page, Locator, expect} from '@playwright/test';
import {BasePage} from './BasePage';

export class DemoQAPage extends BasePage {
    private AlertsFrames: Locator;
    private BrowserWindows:Locator;
    private newTabBtn:Locator;
    private newWindowBtn:Locator;
    private newWindowMsg: Locator;

    constructor(page:Page) {
        super(page);
        this.AlertsFrames = this.page.locator("text=Alerts, Frame & Windows");
        this.BrowserWindows = this.page.locator("text=Browser Windows");
        this.newTabBtn = this.page.locator('#tabButton');
        this.newWindowBtn = this.page.locator('#windowButton');
        this.newWindowMsg = this.page.locator('#messageWindowButton');
        
    }

    public async navigate(){
        const url = process.env.BASE_URL6;
         if (!url) {
            throw new Error('BASE_URL is not defined in env file');
        }
        await this.webPageUtils.navigate(url);
    }

    public async ClickOnAlertsFrames(){
        await this.webActionUtils.click(this.AlertsFrames);
    }

    public async ClickOnBrowserWindows(){
        await this.webActionUtils.click(this.BrowserWindows);
    }

    public async ClickOnNewTab(){
        const [newTab] = await Promise.all([this.page.waitForEvent('popup'),this.webActionUtils.click(this.newTabBtn)]);
        await newTab.waitForLoadState();
        console.log("New tab url:", newTab.url());
        await this.page.waitForTimeout(5000);
        await newTab.close();

    }

    public async ClickOnNewWindow(){
        const [newWindow] = await Promise.all([this.page.context().waitForEvent('page'),this.webActionUtils.click(this.newWindowBtn)]);
        await newWindow.waitForLoadState();
        console.log("New window url:", newWindow.url());
        await this.page.waitForTimeout(5000);
         await this.page.bringToFront();//switch back to original window
         await this.webActionUtils.click(this.newWindowMsg);//perform actions in original
         await newWindow.bringToFront();//switch back to new window

    }
}
