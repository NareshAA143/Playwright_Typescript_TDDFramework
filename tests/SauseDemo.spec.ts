import { test, expect } from '../base-test';

test('SauceDemo test', async ({sauceDemoLoginPage,sauceDemoProductsPage}) => {
  await sauceDemoLoginPage.navigate();
  await sauceDemoLoginPage.login('standard_user', 'secret_sauce');
  await sauceDemoProductsPage.verifyProductsPageURL('https://www.saucedemo.com/inventory.html');
  await sauceDemoProductsPage.getProductsCount();
  await sauceDemoProductsPage.getAllProdutcsNames();
  await sauceDemoProductsPage.ValidateProductTitles();
  await sauceDemoProductsPage.ValidateProductDescriptions();
  await sauceDemoProductsPage.ValidateProductPrices();
  

});
