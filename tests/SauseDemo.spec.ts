import { domainToASCII } from 'url';
import { test, expect } from '../base-test';
import { SauseDemoCartPage } from '../pages/SauceDemoCartPage';
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

test('Validate cart page with single product addded', async ({ sauceDemoProductsPage, sauceDemoCartPage }) => {
  const product = await sauceDemoProductsPage.getFirstProductDetails();
  console.log("Product details before adding to cart:", product);
  await sauceDemoProductsPage.addFirstProductToCart();
  await sauceDemoProductsPage.clickOnCartLink();
  await sauceDemoCartPage.VerifyCartPageURL('https://www.saucedemo.com/cart.html');
  const cartProduct = await sauceDemoCartPage.getProductDetails();
  console.log("Cart product details after adding to cart:", cartProduct);
  await sauceDemoCartPage.CheckUIElements();
  expect(cartProduct).toEqual(product);

});

test('Validate cart page with multiple products add', async ({ sauceDemoProductsPage, sauceDemoCartPage }) => {
    const products = await sauceDemoProductsPage.getAllProductDetails();
    await sauceDemoProductsPage.addAllProductsToCart();
    await sauceDemoProductsPage.clickOnCartLink();

});

test('Validate specific product added to cart', async ({ sauceDemoProductsPage, sauceDemoCartPage }) => {
  
    const products = await sauceDemoProductsPage.getSpecificProductDetails("Sauce Labs Backpack");
    console.log("Specific product details before adding to cart:", products);
    await sauceDemoProductsPage.addSpecificProductToCart("Sauce Labs Backpack");
    await sauceDemoProductsPage.addSecondProductToCart();
    await sauceDemoProductsPage.clickOnCartLink();
    const cartProduct = await sauceDemoCartPage.getSpecificProductDetails("Sauce Labs Backpack");
    console.log("Added specific product details after adding to cart:", cartProduct);
    expect(cartProduct).toEqual(products);
})

test('Validate Cotinue Shopping Functionality', async ({ sauceDemoProductsPage,sauceDemoCartPage }) => {
  await sauceDemoProductsPage.addFirstProductToCart();
  await sauceDemoProductsPage.clickOnCartLink();
  await sauceDemoCartPage.clickOnContinueShopping();
  await sauceDemoProductsPage.verifyProductsPageURL('https://www.saucedemo.com/inventory.html');

})

test('Validate Remove Product Functionality', async ({ sauceDemoProductsPage, sauceDemoCartPage }) => {
  await sauceDemoProductsPage.addSpecificProductToCart("Sauce Labs Backpack");
    await sauceDemoProductsPage.addSecondProductToCart();
    await sauceDemoProductsPage.clickOnCartLink();
    await sauceDemoCartPage.removeSpecificProduct("Sauce Labs Backpack");

})

test.only('Validate Checkout Page', async ({ sauceDemoProductsPage, sauceDemoCartPage,sauceDemoCheckoutPage }) => {
  const filePath = process.env.Test_Data_Path!;
  const data = CsvUtils.getDataByQEID('Siri', filePath);
  await sauceDemoProductsPage.addSpecificProductToCart("Sauce Labs Backpack");
  await sauceDemoProductsPage.addSecondProductToCart();
  await sauceDemoProductsPage.clickOnCartLink();
  await sauceDemoCartPage.ClickOnCheckout();
  await sauceDemoCheckoutPage.VerifyCheckoutPageURL('https://www.saucedemo.com/checkout-step-one.html');
  await sauceDemoCheckoutPage.fillFirstName(data.cartFirstName);
  await sauceDemoCheckoutPage.fillLastName(data.cartLastName);
  await sauceDemoCheckoutPage.fillPostalCode(data.postalCode);  
  await sauceDemoCheckoutPage.ClickOnContinueButton();

})

})
