import {Page,Locator,expect} from '@playwright/test';
import { BasePage } from './BasePage';

export class OrangeHRMLoginPage extends BasePage{
    private userName: Locator;
    private password: Locator;
    private loginButton: Locator;

    constructor(page:Page){
        super(page);
        this.userName = this.page.locator('input[placeholder="Username"]');
        this.password = this.page.locator('input[placeholder="Password"]');
        this.loginButton = this.page.locator('button[type="submit"]');
    }
    public async Navigate(){
        const url = process.env.BASE_URL;
    if (!url) {
    throw new Error('BASE_URL is not defined in env file');
    }
    await this.webPageUtils.navigate(url);
    }
    public async FillUserName(username:string){
        await this.webActionUtils.fill(this.userName,username);
    }
    public async FillPassword(password:string){
        await this.webActionUtils.fill(this.password,password);
    }
    public async ClickLoginButton(){
        await this.webActionUtils.click(this.loginButton);
    }
}
