import {Page, Locator,expect} from '@playwright/test';
import {BasePage} from './BasePage';

export class OrangeHRMPersonalDetailsPage extends BasePage {
    private empFirstName:Locator;
    private empMiddleName:Locator;
    private empLastName:Locator;
    private empId:Locator;
    private driversLicense:Locator;
    private otherId:Locator;

    constructor(page:Page) {
        super(page);
        this.empFirstName = this.page.locator('input[placeholder="First Name"]');
        this.empMiddleName = this.page.locator('input[placeholder="Middle Name"]');
        this.empLastName = this.page.locator('input[placeholder="Last Name"]');
        this.empId = this.page.locator('(//div[@class="oxd-input-group oxd-input-field-bottom-space"]/child::div/child::input[@class="oxd-input oxd-input--active"])[1]');
        this.driversLicense = this.page.locator('(//div[@class="oxd-input-group oxd-input-field-bottom-space"]/child::div/child::input[@class="oxd-input oxd-input--active"])[3]');
        this.otherId = this.page.locator('(//div[@class="oxd-input-group oxd-input-field-bottom-space"]/child::div/child::input[@class="oxd-input oxd-input--active"])[2]');
    }
    public async FillEmployeeFirstName(firstName:string) {
        await this.webActionUtils.fill(this.empFirstName, firstName);
        await this.page.waitForTimeout(2000);
        const inputValue = await this.empFirstName.inputValue();
        console.log('First Name input value:', inputValue);
        expect(inputValue).toEqual(firstName);
    }
    public async FillEmployeeMiddleName(middleName:string) {
        await this.webActionUtils.fill(this.empMiddleName, middleName);
        await this.page.waitForTimeout(2000);
        const inputValue = await this.empMiddleName.inputValue();
        console.log('Middle Name input value:', inputValue);
        expect(inputValue).toEqual(middleName);
    }
    public async FillEmployeeLastName(lastName:string) {
        await this.webActionUtils.fill(this.empLastName, lastName);
        await this.page.waitForTimeout(3000);
        const inputValue = await this.empLastName.inputValue();
        console.log('Last Name input value:', inputValue);
        expect(inputValue).toEqual(lastName);
    }
    public async FillEmployeeId(employeeId:string) {
        await this.webActionUtils.fill(this.empId, employeeId);
        await this.page.waitForTimeout(3000);
        await this.page.locator('body').click();  
        const inputValue = await this.empId.inputValue();
        console.log('Employee Id input value:', inputValue);
        expect(inputValue).toEqual(employeeId);
    }
    public async FillDriversLicense(driversLicense:string) {
        await this.webActionUtils.fill(this.driversLicense, driversLicense);
        await this.page.waitForTimeout(3000);
        await this.page.locator('body').click();
        const inputValue = await this.driversLicense.inputValue();
        console.log('Drivers License input value:', inputValue);
        expect(inputValue).toEqual(driversLicense);
    }
    public async FillOtherId(otherId:string) {
        await this.webActionUtils.fill(this.otherId, otherId);
        await this.page.waitForTimeout(3000);
        await this.page.locator('body').click();
        const inputValue = await this.otherId.inputValue();
        console.log('Other Id input value:', inputValue);   
        expect(inputValue).toEqual(otherId);
    }
}