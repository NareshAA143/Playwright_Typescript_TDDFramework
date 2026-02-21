import { expect, Locator, Page } from '@playwright/test';
import { BasePage } from './BasePage';
import { SauseDemoProductsPage } from './SauceDemoProductsPage';

export class SauseDemoCartPage extends BasePage {
    private cartTitle: Locator;
    private continueShopping: Locator;
    private checkout: Locator;
    private productTitle: Locator;
    private productDescription: Locator;
    private productPrice: Locator;
    private removeButton: Locator;

    constructor(page: Page) {
        super(page);
        this.cartTitle = this.page.locator('.title');
        this.continueShopping = this.page.locator('#continue-shopping');
        this.checkout = this.page.locator('#checkout');
        this.productTitle = this.page.locator('.inventory_item_name');
        this.productDescription = this.page.locator('.inventory_item_desc');
        this.productPrice = this.page.locator('.inventory_item_price');
        this.removeButton = this.page.locator('.btn.btn_secondary.btn_small.cart_button');
    }

    public async VerifyCartPageURL(URL:string) {
        await this.webPageUtils.verifyURL(URL);
    }

    public async clickOnContinueShopping(){
        await this.webActionUtils.click(this.continueShopping);
    }

    public async CheckUIElements(){
        const title = await this.webElementUtils.getText(this.cartTitle);
        console.log(`Cart title: ${title}`);
        if(title !== 'Your Cart'){
            throw new Error(`Cart title is not correct`);
        }
        const continueShopping = await this.webElementUtils.getText(this.continueShopping);
        console.log(`Continue shopping: ${continueShopping}`);
        if(continueShopping !== 'Continue Shopping'){
            throw new Error(`Continue shopping is not correct`);
        }
        const checkout = await this.webElementUtils.getText(this.checkout);
        console.log(`Checkout: ${checkout}`);
        if(checkout !== 'Checkout'){
            throw new Error(`Checkout is not correct`);
        }
    } 

    public async getProductDetails(){
         const name = await this.productTitle.textContent();
         const description = await this.productDescription.textContent();
         const price = await this.productPrice.textContent();
         return {
            name: name?.trim(),
            description: description?.trim(),
            price: price?.trim()
        }

    }

    public async getAllProductDetails(){
        const allNames = await this.productTitle.allTextContents();
        const allDescription = await this.productDescription.allTextContents();
        const allPrice = await this.productPrice.allTextContents();
        const allProducts = allNames.map((_,i)=>
                               ({ name: allNames[i]?.trim(),
                                description: allDescription[i]?.trim(),
                                price: allPrice[i]?.trim()
            }))
        return allProducts;
}

    public async getSpecificProductDetails(productTitle: string) {
        const allNames = await this.productTitle.allTextContents();
        const allDescription = await this.productDescription.allTextContents();
        const allPrice = await this.productPrice.allTextContents();

        const allProducts = allNames.map((_, i) => ({
        name: allNames[i]?.trim(),
        description: allDescription[i]?.trim(),
        price: allPrice[i]?.trim()
        }));
        return allProducts.filter(product =>product.name?.includes(productTitle)
        );

    }

    public async  removeSpecificProduct(productTitle: string) {
        const count = await this.productTitle.count();
        expect(count).toBeGreaterThan(0);
        for (let i = 0; i < count; i++) {
        const name = (await this.productTitle.nth(i).textContent())?.trim();
           if (name === productTitle) {
           await this.webActionUtils.click(this.removeButton.nth(i));
           console.log(`Product ${i + 1}: ${name} removed from the cart`);
            break; // stop after removing the product
    }
  }
}

   public async ClickOnCheckout(){
       await this.webActionUtils.click(this.checkout);
}
 

}




