import {test} from '../base-test';

test.describe('LetCode Page', () => {
    test.beforeEach(async ({letCodePage}) => {
        await letCodePage.navigate();
    })

   test('LetCode ShoppingList table validation', async ({letCodePage}) => {
    await letCodePage.VerifyShoppingTableNoOfRows();
    await letCodePage.VerifyShoppingTableNoOfColumns();
    await letCodePage.PrintShoppingListTableHeaders();
    await letCodePage.PrintShoppingListItems();
    await letCodePage.PrintShoppingListPrices();
    })

test('Lets Handle Table Validation', async ({letCodePage}) => {
    await letCodePage.CheckLetsHandleItTableHeaders();
    await letCodePage.CheckLetsHandleItTableRows();
    //await letCodePage.CheckOnCheckBoxbyName('Koushik');
    await letCodePage.LetsHandleItCheckCheckBoxesByNames();
    })

test('Sortable Table Validation', async ({letCodePage}) => {
    await letCodePage.CheckSortTable();
    await letCodePage.ListSortTableHeaders();
    await letCodePage.sortByCalories();
    })

})