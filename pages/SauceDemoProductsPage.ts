import { Locator, Page } from '@playwright/test';
import { BasePage } from './BasePage';

export class SauseDemoProductsPage extends BasePage {
  private products: Locator;
  private productList: Locator;
  private productTitle: Locator;
  private productDescription: Locator;
  private productPrice: Locator;
  private addToCart:Locator;

  constructor(page: Page) {
    super(page);
    this.products = this.page.locator('.inventory_list .inventory_item');
    this.productList = this.page.locator('.inventory_item');
    this.productTitle = this.page.locator('.inventory_item_name');
    this.productDescription = this.page.locator('.inventory_item_desc');
    this.productPrice = this.page.locator('.inventory_item_price');
    this.addToCart = this.page.locator('.btn.btn_primary');
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
    const addToCart = await this.addToCart.nth(i).innerText();
    console.log(`Product ${i+1} price: ${addToCart}`);
    if(!addToCart){
      throw new Error(`Product ${i+1} add to cart button is missing`);  
    }
  }
  }
}