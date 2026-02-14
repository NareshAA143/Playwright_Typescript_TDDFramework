import {Page,Locator,expect} from '@playwright/test';
import { BasePage } from './BasePage';

export class OrangeHRMHomePage extends BasePage{
    private myInfo: Locator;

    constructor(page:Page){
        super(page);
        this.myInfo = this.page.locator('//span[text()="My Info"]');
    }
    public async ClickMyInfo(){
        await this.webActionUtils.click(this.myInfo);
    }
}