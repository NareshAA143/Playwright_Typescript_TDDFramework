import { test, expect } from '../base-test';
import { SauseDemoProductsPage } from '../pages/SauceDemoProductsPage';
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
  await sauceDemoProductsPage.ValidateAllProductsDisplayed();
  await sauceDemoProductsPage.getProductsCount();
  await sauceDemoProductsPage.getAllProdutcsNames();
  await sauceDemoProductsPage.ValidateProductTitles();
  await sauceDemoProductsPage.ValidateProductDescriptions();
  await sauceDemoProductsPage.ValidateProductPrices();
  await sauceDemoProductsPage.addFirstProductToCart();

});

test('Add all produtcs to the cart', async({sauceDemoProductsPage})=>{
   await sauceDemoProductsPage.ValidateAllProductsDisplayed();
  await sauceDemoProductsPage.addAllProductsToCart();
})

test('Validate adding a specific product to the cart', async({sauceDemoProductsPage})=>{
  await sauceDemoProductsPage.addSpecificProductToCart("Sauce Labs Backpack");
})

test('Validate adding all products to the cart by product name', async({sauceDemoProductsPage})=>{
  await sauceDemoProductsPage.aadAllProductsToCartByProductName();
})

test('SauceDemo About Page', async ({sauceDemoProductsPage,sauceDemoAboutPage}) => {
  await sauceDemoProductsPage.ClickOnMenu();
  await sauceDemoProductsPage.clickOnAbout();
  await sauceDemoAboutPage.VerifyRequestADemo();
  
});

test('Sort products by name AtoZ', async ({sauceDemoProductsPage}) => {
  await sauceDemoProductsPage.filterByNameAtoZ();
  await sauceDemoProductsPage.SortByProductNameAtoZ();
});

test.skip('Sort products by name ZtoA', async ({sauceDemoProductsPage}) => {
  await sauceDemoProductsPage.filterByNameZtoA();
  await sauceDemoProductsPage.SortByProductNameZtoA();
});

test.skip('Sort products by prices low to high', async ({sauceDemoProductsPage}) => {
  await sauceDemoProductsPage.filterByPriceLowtoHigh();
  await sauceDemoProductsPage.SortByPriceLowToHigh();
});

test.skip('Sort products by prices high to low', async ({sauceDemoProductsPage}) => {
  await sauceDemoProductsPage.filterByPriceHightoLow();
  await sauceDemoProductsPage.SortByPriceHighToLow();
});


})
