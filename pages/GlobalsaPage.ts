import {Page, Locator, expect} from '@playwright/test';
import {BasePage} from './BasePage';

export class GlobalsaPage extends BasePage {
   private dateInputBox: Locator;
    private date: Locator;

    
    constructor(page: Page) {
        super(page);
        //this.dateInputBox= this.page.locator('#post-2661').getByRole('paragraph').locator('iframe').contentFrame().locator('#datepicker')
        this.dateInputBox = this.page.frameLocator('#post-2661 iframe[src*="default.html"]').locator('#datepicker');
        this.date=this.page.locator('#post-2661').getByRole('paragraph').locator('iframe').contentFrame().getByRole('link', { name:'25', exact: true })
}

public async navigate() {
    const url = process.env.BASE_URL3;
    if (!url) {
        throw new Error('BASE_URL is not defined in env file');
    }   
    await this.webPageUtils.navigate(url);
}

public async FillDate() {
    await this.dateInputBox.waitFor({ state: 'visible', timeout: 15000 });
    await this.dateInputBox.click();
    await this.date.click();
    await expect(this.dateInputBox).toHaveValue('02/25/2026');
    await this.page.waitForTimeout(3000);
}

public async FillCurrentDate() {
    const currentDate = new Date();
    console.log("Whole Date :",currentDate);//It prints the current system date & time in this format:2025-12-02T17:25:31.123Z

    const todayDate= currentDate.getDate();
    console.log("TodayDate :",todayDate);//Prints only the day of the month:

    await this.dateInputBox.click();
    await this.page.locator('#post-2661').getByRole('paragraph').locator('iframe').contentFrame().locator(`text="${todayDate}"`).click();
    const DateTextBoxValue=await this.dateInputBox.inputValue();
    console.log("DateTextBoxValue :",DateTextBoxValue);//Prints only the day of the month:

    const today=new Date();
    const currentday=today.getDate();
    console.log("CurrentDay :",currentday);//Prints only the day of the month:

    const currentMonth = today.getMonth()+1;
    console.log("CurrentMonth :",currentMonth);//Prints only the day of the month:

    const currentFullYear = today.getFullYear();
    console.log("CurrentFullYear :",currentFullYear);//Prints only the day of the month:

    const formattedDate = `${currentMonth}/${todayDate}/${currentFullYear}`;
    console.log("FormattedDate :",formattedDate);//Prints only the day of the month:

    //formatt the date
    const expectedDate=new Date(formattedDate);
    const actualDate=new Date(DateTextBoxValue);

    expect(actualDate.getTime()).toBe(expectedDate.getTime());
    await this.page.waitForTimeout(3000);

}

public async SelectAnyDate() {
const targetYear='2026';
const targetMonth="May";
const targetDay="2";
const iframe = await this.page.locator('#post-2661').getByRole('paragraph').locator('iframe').contentFrame();

await this.dateInputBox.click();
//Year selection
while(true){
    const displayedYearText=await iframe.locator('.ui-datepicker-year').textContent()||0;//The OR (||) operator returns the first truthy value.
    console.log("displayedYearText :",displayedYearText);
    if(displayedYearText===targetYear){
        break;
    }
    if(displayedYearText<targetYear){
    await iframe.locator('.ui-icon.ui-icon-circle-triangle-e').click();//next button
    }
    else{
        await iframe.locator('.ui-icon.ui-icon-circle-triangle-w').click();//previous button
    }

}

//Month selectors
while(true){
 const displayedMonthText=await iframe.locator('.ui-datepicker-month').textContent()||0;//The OR (||) operator returns the first truthy value.
 console.log("displayedMonthText :",displayedMonthText);
 if(displayedMonthText===targetMonth){
     break;
 }
 if(displayedMonthText<targetMonth){
     await iframe.locator('.ui-datepicker-next').click();//next button
 }
 else{
     await iframe.locator('.ui-datepicker-prev').click();//previous button
 }
}
await iframe.locator(`text="${targetDay}"`).click();
await this.page.waitForTimeout(3000);


}}