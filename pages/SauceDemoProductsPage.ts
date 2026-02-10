import { Locator, Page } from '@playwright/test';
import { BasePage } from './BasePage';

export class SauseDemoProductsPage extends BasePage {
  private products: Locator;

  constructor(page: Page) {
    super(page);
    this.products = page.locator('.inventory_list .inventory_item');
  }

  public async verifyProductsPageURL(URL:string) {
    await this.webPageUtils.verifyURL(URL);
  }

 public async getProductsCount() {
    const productsCount = await this.webActionUtils.count(this.products);
    console.log(`Total products found: ${productsCount}`);
  }
}
