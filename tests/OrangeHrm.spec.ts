import { test, expect } from '../base-test';
import { CsvUtils } from '../Utils/CsvUtils';

test('OrangeHRM MyInfo Flow', async ({orangeHRMLoginPage, orangeHRMHomePage, orangeHRMPersonalDetailsPage}) => {
    await orangeHRMLoginPage.Navigate();
    const filePath = process.env.Test_Data_Path!;
    const data = CsvUtils.getDataByQEID('Siri', filePath);
    //loging in to OrangeHRM
    await orangeHRMLoginPage.Navigate();
    await orangeHRMLoginPage.FillUserName(data.OrangeHRMusername);
    await orangeHRMLoginPage.FillPassword(data.OrangeHRMpassword);
    await orangeHRMLoginPage.ClickLoginButton();
    //navigating to MyInfo 
    await orangeHRMHomePage.ClickMyInfo();
    //filling personal details form
    await orangeHRMPersonalDetailsPage.FillEmployeeFirstName(data.EmpFirstName);
    await orangeHRMPersonalDetailsPage.FillEmployeeMiddleName(data.EmpMiddleName);
    await orangeHRMPersonalDetailsPage.FillEmployeeLastName(data.EmpLastName);
    await orangeHRMPersonalDetailsPage.FillEmployeeId(data.EmpId);
    await orangeHRMPersonalDetailsPage.FillDriversLicense(data.DriversLicense);
    await orangeHRMPersonalDetailsPage.FillOtherId(data.OtherId);

})  