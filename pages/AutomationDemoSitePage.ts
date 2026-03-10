import { expect, Locator, Page } from '@playwright/test';
import { BasePage } from './BasePage';

export class AutomationDemoSitePage extends BasePage {
    private firstName: Locator;
    private lastName: Locator;
    private address: Locator;
    private emailAddress: Locator;
    private phone: Locator;
    private gender: Locator;
    private Hobbies: Locator;
    private LanguagesDrpDwn: Locator;
    private skillsDrpDwn: Locator;
    private selectCountryArrowBtn: Locator;
    private selectCountryDrpDwn: Locator;
    private yearOfBirthDrpDwn: Locator;
    private monthOfBirthDrpDwn: Locator;
    private dayOfBirthDrpDwn: Locator;
    private password: Locator;
    private confirmPassword: Locator;
    private submitButton: Locator;
    private refreshButton: Locator;

    constructor(page: Page) {
        super(page);
        this.firstName = this.page.locator('input[placeholder="First Name"]');
        this.lastName = this.page.locator('input[placeholder="Last Name"]');
        this.address = this.page.locator('.form-group .col-md-8.col-xs-8.col-sm-8 .form-control');
        this.emailAddress = this.page.locator('input[type="email"]');
        this.phone = this.page.locator('//div[contains(@class,"col-md-4")]/child::input[@type="tel"]');
        this.gender = this.page.locator('input[value="Male"]');
        this.Hobbies = this.page.locator('#checkbox1');
        this.LanguagesDrpDwn=this.page.locator('#msdd');
        this.skillsDrpDwn = this.page.locator('#Skills');
        this.selectCountryArrowBtn = this.page.locator('span[role="presentation"]');
        this.selectCountryDrpDwn = this.page.locator('input[role="textbox"]');
        this.yearOfBirthDrpDwn = this.page.locator('#yearbox');
        this.monthOfBirthDrpDwn = this.page.locator('select[placeholder="Month"]');
        this.dayOfBirthDrpDwn = this.page.locator('#daybox');
        this.password = this.page.locator('#firstpassword');
        this.confirmPassword = this.page.locator('#secondpassword');
        this.submitButton = this.page.locator('#submitbtn');
        this.refreshButton = this.page.locator('#Button1');
    }

    public async navigate(){
        const url = process.env.BASE_URL7;
        if(!url){
            throw new Error('Base Url is not set');
        }
        await this.page.goto(url);
    }

    public async fillFullName(firstName: string, lastName: string){
        
        await this.webActionUtils.fill(this.firstName, firstName);
        await this.webActionUtils.fill(this.lastName, lastName);
        await this.page.locator('body').click();
    }

    public async fillAddress(address:string){
        await this.webActionUtils.fill(this.address, address);
    }

    public async fillEmailAddress(emailAddress:string){
        await this.webActionUtils.fill(this.emailAddress, emailAddress);
         await this.page.locator('body').click();
    }

    public async fillPhone(phone:string){
        await this.webActionUtils.fill(this.phone, phone);
    }

    public async CheckGender(){
        await this.webActionUtils.check(this.gender);
    }
    
    public async CheckHobbies(){
        await this.webActionUtils.check(this.Hobbies);
    }

   public async CheckLanguages(language: string) {
    await this.webActionUtils.click(this.LanguagesDrpDwn);
    await this.page.locator('ul.ui-autocomplete li a', { hasText: language }).first().click();
    await this.page.locator('body').click();
}

    public async CheckSkills(skill: string){
        await this.webActionUtils.selectByLabel(this.skillsDrpDwn, skill);
        await this.page.locator('body').click();
    }

    public async CheckCountry(country:string){    
       
        await this.webActionUtils.click(this.selectCountryArrowBtn);
        await this.webActionUtils.fill(this.selectCountryDrpDwn, country);
        const option = this.page.locator('//span[@class="select2-results"]/ul/li', { hasText: country });
        await option.first().waitFor({ state: 'visible' });
        await option.first().click();
        await this.page.locator('body').click();
    }

    public async FillYearOfBirth(year:string){
        await this.webActionUtils.selectByValue(this.yearOfBirthDrpDwn, year);
    }

    public async FillMonthOfBirth(month:string){
        await this.webActionUtils.selectByValue(this.monthOfBirthDrpDwn, month);
    }

    public async FillDayOfBirth(day:string){
        await this.webActionUtils.selectByValue(this.dayOfBirthDrpDwn, day);
    }

    public async FillPassword(password:string){
        await this.webActionUtils.fill(this.password, password);
    }

    public async FillConfirmPassword(confirmPassword:string){
        await this.webActionUtils.fill(this.confirmPassword, confirmPassword);
    }

    public async ClickSubmitButton(){
        await this.webActionUtils.click(this.submitButton);
    }

    

}