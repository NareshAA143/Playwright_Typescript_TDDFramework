import { expect, Locator, Page } from '@playwright/test';
import { BasePage } from './BasePage';

export class SauseDemoProductsPage extends BasePage {
  private products: Locator;
  private productList: Locator;
  private productTitle: Locator;
  private productDescription: Locator;
  private productPrice: Locator;
  private addToCartButton:Locator;
  private menu: Locator;
  private logout: Locator;
  private about: Locator;
  private filterDropdown: Locator;
  private NameAtoZ: Locator;
  private NameZtoA: Locator;
  private priceLowToHigh: Locator;
  private priceHighToLow: Locator;

  constructor(page: Page) {
    super(page);
    this.products = this.page.locator('.inventory_list .inventory_item');
    this.productList = this.page.locator('.inventory_item');
    this.productTitle = this.page.locator('.inventory_item_name');
    this.productDescription = this.page.locator('.inventory_item_desc');
    this.productPrice = this.page.locator('.inventory_item_price');
    this.addToCartButton = this.page.locator('//div[@class="pricebar"]/child::button');
    this.products = this.page.locator('[data-test="title"]');
    this.menu = this.page.locator('#react-burger-menu-btn');
    this.logout = this.page.locator('#logout_sidebar_link');
    this.about = this.page.locator('#about_sidebar_link');
    //this.filterDropdown = this.page.locator('.product_sort_container');
    this.filterDropdown = this.page.locator('[data-test="product-sort-container"]');
    this.NameAtoZ = this.page.locator('option[value="az"]');
    this.NameZtoA = this.page.locator('option[value="za"]');
    this.priceLowToHigh = this.page.locator('option[value="lohi"]');
    this.priceHighToLow = this.page.locator('option[value="hilo"]');

  }

  public async verifyProductsPageURL(URL:string) {
    await this.webPageUtils.verifyURL(URL);
  }

 public async getProductsCount() {
    const productsCount = await this.webActionUtils.count(this.products);
    console.log(`Total products found: ${productsCount}`);
  }
  public async getAllProdutcsNames() {
    const productsNames = await this.webElementUtils.getAllText(this.productTitle);
    console.log(`All products names: ${productsNames}`);
  }
  public async ValidateAllProductsDisplayed(){
    const names = await this.webElementUtils.getAllText(this.productTitle);
    const descriptions = await this.webElementUtils.getAllText(this.productDescription);
    const prices = await this.webElementUtils.getAllText(this.productPrice);
    const buttonsCount = await this.webActionUtils.count(this.addToCartButton);
    if(names.length===0)
      throw new Error(`No products found`);
    if(names.length!==descriptions.length || names.length!==prices.length || names.length!==buttonsCount)
      throw new Error(`Mismatch between product details`);
  }
  public async addFirstProductToCart(){
    await this.webActionUtils.click(this.addToCartButton.nth(0));
    await this.page.locator('body').click();

  }

 public async addAllProductsToCart() {
    const count = await this.addToCartButton.count();
    console.log(`Total products to add to cart: ${count}`);
    for (let i = 0; i < count; i++) {
        const button = this.addToCartButton.nth(i);
        await button.scrollIntoViewIfNeeded();
        await button.waitFor({ state: 'visible', timeout: 5000 });
        await this.webActionUtils.forceclick(button);
    }
}

  public async ValidateProductTitles(){
      const allTitles = await this.productTitle.all();
      for(let i=0; i< allTitles.length; i++){
        const title = await allTitles[i].innerText();
        console.log(`Product ${i+1} title: ${title}`);
        if(!title){
          throw new Error(`Product ${i+1} title is empty`);
        }
      }
      
  }
  public async ValidateProductDescriptions(){
    const allDescriptions = await this.productDescription.all();
    for(let i=0; i< allDescriptions.length; i++){
      const description = await allDescriptions[i].innerText();
      console.log(`Product ${i+1} description: ${description}`);
      if(!description){
        throw new Error(`Product ${i+1} description is empty`);
      }
    }
  }
  public async ValidateProductPrices(){
    const allPrices = await this.productPrice.all();
    for(let i=0; i< allPrices.length; i++){
      const price = await allPrices[i].innerText();
      console.log(`Product ${i+1} price: ${price}`);
      if(!price){
        throw new Error(`Product ${i+1} price is empty`);
      }
    const addToCart = await this.addToCartButton.nth(i).innerText();
    console.log(`Product ${i+1} price: ${addToCart}`);
    if(!addToCart){
      throw new Error(`Product ${i+1} add to cart button is missing`);  
    }
  }
  }
  public async aadAllProductsToCartByProductName(){
    const productslist:string[] = ['Sauce Labs Backpack', 'Sauce Labs Bike Light', 'Sauce Labs Bolt T-Shirt', 'Sauce Labs Fleece Jacket','Sauce Labs Onesie','Test.allTheThings() T-Shirt (Red)'];
    for(let i=0; i< productslist.length; i++){
      const name = await this.productTitle.nth(i).innerText();
      if(name === productslist[i]){
        await this.webActionUtils.click(this.addToCartButton.nth(i));
        console.log(`Product ${i+1}: ${name} added to cart`);
        await this.page.waitForTimeout(2000);
      }
  }
  }
  public async addSpecificProductToCart(productTitle:string){
    for(let i=0; i<await this.addToCartButton.count(); i++){
      const name = await this.productTitle.nth(i).innerText();
      if(name === productTitle){
        await this.webActionUtils.click(this.addToCartButton.nth(i));
        console.log(`Product ${i+1}: ${name} added to cart`);
        await this.page.waitForTimeout(2000); 
      }
    }
  }
  public async clickOnFilterDropdown(){
    await this.webActionUtils.click(this.filterDropdown);
    await this.filterDropdown.waitFor({ state: 'visible', timeout: 5000 });
  }
public async filterByNameAtoZ(){
    await this.filterDropdown.click();
    await this.filterDropdown.selectOption({index:0});
}
public async filterByNameZtoA(){
    await this.filterDropdown.click();
    await this.filterDropdown.selectOption({index:1});  
}
public async filterByPriceLowtoHigh(){
    await this.filterDropdown.selectOption({index:2});
}
public async filterByPriceHightoLow(){
    await this.filterDropdown.click();
    await this.filterDropdown.selectOption({index:3});
}
  public async SortByProductNameAtoZ() {
  const productNames = await this.productTitle.allTextContents();
  console.log(`Product names: ${productNames}`);
  //const sortedProductNames = [...productNames].sort((a, b) => a.localeCompare(b));
   const sortedProductNamesInAscend = [...productNames].sort();
  console.log(`Sorted product names (A to Z): ${sortedProductNamesInAscend}`);
  expect(productNames).toEqual(sortedProductNamesInAscend);
}

public async SortByProductNameZtoA() {
  const productNames = await this.productTitle.allTextContents();
  //const sortedProductNames = [...productNames].sort((a, b) => b.localeCompare(a));
  const sortedProductNamesInDescend = [...productNames].sort().reverse();
  console.log(`Sorted product names (Z to A): ${sortedProductNamesInDescend}`);
  expect(productNames).toEqual(sortedProductNamesInDescend);
}

public async SortByPriceLowToHigh() {
  const productPrices = await this.productPrice.allTextContents();
  const ProductPriceswithout$ = productPrices.map(price=>parseInt(price.replace('$','')));
  console.log(`Product prices: ${ProductPriceswithout$}`);
  const sortedProductPrices = [...ProductPriceswithout$].sort((a, b) => a - b);
  console.log(`Sorted product prices (Low to High): ${sortedProductPrices}`);
  expect(ProductPriceswithout$).toEqual(sortedProductPrices);
}

public async SortByPriceHighToLow() {
  const productPrices = await this.productPrice.allTextContents();
  const ProductPriceswithout$ = productPrices.map(price=>parseInt(price.replace('$','')));
  console.log(`Product prices: ${ProductPriceswithout$}`);
  const sortedProductPrices = [...ProductPriceswithout$].sort((a, b) => b - a);
  console.log(`Sorted product prices (High to Low): ${sortedProductPrices}`);
  expect(ProductPriceswithout$).toEqual(sortedProductPrices);
}

  public async ClickOnMenu(){
     await this.webActionUtils.click(this.menu);
  }
  public async clickOnAbout(){
    await this.webActionUtils.click(this.about);
  }
  public async ClickOnLogout(){
    await this.webActionUtils.click(this.logout);
  }

}