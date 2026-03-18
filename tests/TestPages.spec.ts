import { test, expect } from '../base-test';

test('Handling frames', async({ testPagerPage }) => {
       await testPagerPage.Navigate();
       await testPagerPage.CountFrames();
       await testPagerPage.InteractWithFrame1();
    })