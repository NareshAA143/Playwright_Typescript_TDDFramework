import { test} from '../base-test';
import { AutomationDemoSitePage } from '../pages/AutomationDemoSitePage';

test('Registration Page', async({automationDemoSitePage})=>{
        await automationDemoSitePage.navigate();
        await automationDemoSitePage.fillFullName('Tom', 'Jerry');
        await automationDemoSitePage.fillAddress('hyderabad');
        await automationDemoSitePage.fillEmailAddress('tom@gmail.com');
        await automationDemoSitePage.fillPhone('9876543210');
        await automationDemoSitePage.CheckGender();
        await automationDemoSitePage.CheckHobbies();
        await automationDemoSitePage.CheckLanguages('English');
        await automationDemoSitePage.CheckSkills('Java');
        await automationDemoSitePage.CheckCountry('India');
        await automationDemoSitePage.FillYearOfBirth('1990');
        await automationDemoSitePage.FillMonthOfBirth('January');
        await automationDemoSitePage.FillDayOfBirth('1');
        await automationDemoSitePage.FillPassword('123456789');
        await automationDemoSitePage.FillConfirmPassword('123456789');
        await automationDemoSitePage.ClickSubmitButton();
        
})