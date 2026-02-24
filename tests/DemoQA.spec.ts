import { test, expect } from '../base-test';

test.describe('DemoQA Page', () => {

    test.beforeEach(async ({demoQAPage}) => {
        await demoQAPage.navigate();
        await demoQAPage.ClickOnAlertsFrames();
        await demoQAPage.ClickOnBrowserWindows();
    });

test('newTab', async ({demoQAPage}) => {
     await demoQAPage.ClickOnNewTab();

})

test('newWindow', async ({demoQAPage}) => {
   await demoQAPage.ClickOnNewWindow();

})

});


