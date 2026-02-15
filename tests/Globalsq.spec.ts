import { test, expect } from '../base-test';
import { CsvUtils } from '../Utils/CsvUtils';

test('Date Picker using playwright text method', async ({globalsqaPage}) => {    
    await globalsqaPage.navigate();
    const filePath = process.env.Test_Data_Path!;
    const data = CsvUtils.getDataByQEID('Siri', filePath);
    await globalsqaPage.navigate();
    //await globalsqaPage.FillDate();
    //await globalsqaPage.FillCurrentDate();
    await globalsqaPage.SelectAnyDate();

})