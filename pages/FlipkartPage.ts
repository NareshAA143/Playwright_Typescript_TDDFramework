import {Page, Locator, expect} from '@playwright/test';
import {BasePage} from './BasePage';

export class FlipkartPage extends BasePage {
    private xbutton: Locator;
    private searchBox: Locator;
    private productCards: Locator;
    private allLaptopsNames: Locator;

    constructor(page: Page) {
        super(page);
        this.page = page;
        this.xbutton = this.page.locator('span[role="button"]');
        this.searchBox = this.page.getByRole('textbox', { name: 'Search for Products, Brands' });
        this.productCards = this.page.locator('.nZIRY7');
        this.allLaptopsNames = this.page.locator('.RG5Slk');
    }

    public async navigate(){
        const url = process.env.BASE_URL5;
        if (!url) {
    throw new Error('BASE_URL is not defined in env file');
    }
        await this.webPageUtils.navigate(url);
    }

    public async ClickXButton() {
        await this.webActionUtils.click(this.xbutton);
    }

  public async SearchProdcut(productName: string) {
    await this.webActionUtils.click(this.searchBox);
    await this.webActionUtils.fill(this.searchBox, productName);
    await this.page.keyboard.press('Enter');

    await this.page.waitForLoadState('domcontentloaded'); // better
    await this.page.waitForTimeout(3000); // ⭐ stabilization for WebKit
}

   public async GetAllLaptopNames(): Promise<{laptopNames: string[],brandNames: string[],uniqueBrands: string[]}> {
    
    await this.allLaptopsNames.first().waitFor({ state: 'visible', timeout: 10000 });

    const laptopNames = await this.webActionUtils.getAllText(this.allLaptopsNames);
    console.log("AllLaptopNames :", laptopNames);

    const brandNames = laptopNames.map(name => name.split(' ')[0]);
    console.log("AllbrandNames :", brandNames);

    const uniqueBrands = Array.from(new Set(brandNames));
    console.log("uniqueBrands :", uniqueBrands);

    return { laptopNames, brandNames, uniqueBrands };
}

    public async GetAllBrandNamesWithPrice(): Promise<Map<string, string>> {
    const count = await this.productCards.count();
    console.log("count :", count);

    const productMap = new Map<string, string>();

    for (let i = 0; i < count; i++) {
        const cards = this.productCards.nth(i);

        const nameLocator = cards.locator('.RG5Slk');
        const priceLocator = cards.locator('.hZ3P6w.DeU9vF');

        const nameText = (await nameLocator.innerText()).trim().split(' ')[0];
        const priceText = (await priceLocator.innerText()).trim();

        if (nameText && priceText) {
            productMap.set(nameText, priceText);
        }
    }

    console.log("productMap is:", productMap);

    const someProduct = "Acer";
    if (productMap.has(someProduct)) {
        console.log(`${someProduct} price is ${productMap.get(someProduct)}`);
    } else {
        console.log(`${someProduct} not found`);
    }

    for (const [product, price] of productMap) {
        console.log(`product: ${product}, price: ${price}`);
    }

    return productMap;
}
    

    
}