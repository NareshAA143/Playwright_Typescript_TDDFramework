import { test, expect } from '../base-test';
import { CsvUtils } from '../Utils/CsvUtils';

test('Amazon AutoSuggest Dropdown', async ({amazonPage}) => {
    await amazonPage.navigate();
    const filePath = process.env.Test_Data_Path!;
    const data = CsvUtils.getDataByQEID('Siri', filePath);
    await amazonPage.navigate();
    await amazonPage.SearchProdcut(data.productName);
    await amazonPage.VerifySuggestedProduct();
    await amazonPage.VerifyCertainProductInSuggestedList('iphone 17 pro');
    await amazonPage.ClickOnIPhoneUsingForLoop();
})