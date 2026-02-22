import { test, expect } from '../base-test';

test('Flipkart Page', async ({ flipkartPage }) => {
    await flipkartPage.navigate();
    await flipkartPage.ClickXButton();
    await flipkartPage.SearchProdcut('laptop');
    await flipkartPage.GetAllLaptopNames();
    await flipkartPage.GetAllBrandNamesWithPrice();

    
});