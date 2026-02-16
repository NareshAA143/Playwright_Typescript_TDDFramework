import { test, expect } from '../base-test';
import { CsvUtils } from '../Utils/CsvUtils';

test.describe('SauceDemo Page', () => {
  test.beforeEach(async ({sauceDemoLoginPage,sauceDemoProductsPage}) => {
    const filePath = process.env.Test_Data_Path!;
    const data = CsvUtils.getDataByQEID('Siri', filePath);
    await sauceDemoLoginPage.navigate();
    await sauceDemoLoginPage.login(data.username, data.password);
    await sauceDemoProductsPage.verifyProductsPageURL('https://www.saucedemo.com/inventory.html');
  });
test('SauceDemo test products validation', async ({sauceDemoLoginPage,sauceDemoProductsPage}) => {
  await sauceDemoProductsPage.getProductsCount();
  await sauceDemoProductsPage.getAllProdutcsNames();
  await sauceDemoProductsPage.ValidateProductTitles();
  await sauceDemoProductsPage.ValidateProductDescriptions();
  await sauceDemoProductsPage.ValidateProductPrices();

});

test('SauceDemo About Page', async ({sauceDemoProductsPage,sauceDemoAboutPage}) => {
  await sauceDemoProductsPage.ClickOnMenu();
  await sauceDemoProductsPage.clickOnAbout();
  await sauceDemoAboutPage.VerifyRequestADemo();
  
});

})
