import { test, expect } from '../base-test';

test('login with valid credentials', async ({sauceDemoLoginPage,sauceDemoProductsPage}) => {
  await sauceDemoLoginPage.navigate();
  await sauceDemoLoginPage.login('standard_user', 'secret_sauce');
  await sauceDemoProductsPage.verifyProductsPageURL('https://www.saucedemo.com/inventory.html');
  await sauceDemoProductsPage.getProductsCount();
  await sauceDemoProductsPage.getAllProdutcsNames();
  

});
