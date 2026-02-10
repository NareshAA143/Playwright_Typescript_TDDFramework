import { Locator, Page } from '@playwright/test';
import { BasePage } from './BasePage';

export class SauseDemoProductsPage extends BasePage {
  private products: Locator;
  private productTitle: Locator;
  private addToCart:Locator;

  constructor(page: Page) {
    super(page);
    this.products = this.page.locator('.inventory_list .inventory_item');
    this.productTitle = this.page.locator('.inventory_item_name');
    this.addToCart = this.page.locator('#add-to-cart-sauce-labs-backpack');
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
}
