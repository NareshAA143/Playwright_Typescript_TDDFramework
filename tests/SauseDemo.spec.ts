import { test, expect } from '../base-test';
import { CsvUtils } from '../Utils/CsvUtils';

test('SauceDemo test', async ({sauceDemoLoginPage,sauceDemoProductsPage}) => {
  const filePath = process.env.Test_Data_Path!;
  const data = CsvUtils.getDataByQEID('Siri', filePath);
  await sauceDemoLoginPage.navigate();
  await sauceDemoLoginPage.login(data.username, data.password);
  await sauceDemoProductsPage.verifyProductsPageURL('https://www.saucedemo.com/inventory.html');
  await sauceDemoProductsPage.getProductsCount();
  await sauceDemoProductsPage.getAllProdutcsNames();
  await sauceDemoProductsPage.ValidateProductTitles();
  await sauceDemoProductsPage.ValidateProductDescriptions();
  await sauceDemoProductsPage.ValidateProductPrices();
  

});
