import { test as base, Page, expect } from '@playwright/test';
/**
 * ================= ENV SETUP GUIDE =================
 *
 * 1. Install dotenv package:
 *    npm install dotenv --save
 *
 * 2. Create a `.env` file inside the `configs` folder.
 *    Add your environment constants, for example:
 *      BASE_URL=https://example.com
 *      OTHER_CONSTANT=value
 *
 * 3. Load `.env` in `playwright.config.ts`:
 *    require('dotenv').config();
 * 
 * 4. Use BASE_URL in Playwright config:
 *    use: {
 *      baseURL: process.env.BASE_URL,
 *      // other options...
 *    }
 *
 * 5. Load `.env` in `base-test.ts` to access environment variables:
 *    import * as dotenv from 'dotenv';
 *    import * as path from 'path';
 *    dotenv.config({ path: path.resolve(__dirname, 'configs/.env') });
 *    // Now you can use process.env.BASE_URL and other constants in your tests
 *
 * ===================================================
 */

import * as dotenv from 'dotenv';
import * as path from 'path';
import { allure } from 'allure-playwright';

// Load .env from configs folder
dotenv.config({ path: path.resolve(__dirname, 'configs/.env') });

import { SauceDemoLoginPage } from './pages/SauceDemoLoginPage';
import { SauseDemoProductsPage } from './pages/SauceDemoProductsPage';
import { AmazonPage } from './pages/AmazonPage';
import { OrangeHRMLoginPage } from './pages/OrangeHRMLoginPage';
import { OrangeHRMHomePage } from './pages/OrangeHRMHomePage';
import { OrangeHRMPersonalDetailsPage } from './pages/OrangeHRMPersonalDetailsPage';
import { GlobalsaPage } from './pages/GlobalsaPage';
import { LetCodePage } from './pages/LetCodePage';
import { SauceDemoAboutPage } from './pages/SauceDemoAboutPage';
import { SauseDemoCartPage } from './pages/SauceDemoCartPage';
import { SauceDemoCheckoutPage } from './pages/SauceDemoCheckoutPage';
import { FlipkartPage } from './pages/FlipkartPage';
import { DemoQAPage } from './pages/DemoQAPage';

type Fixtures = {
  sauceDemoLoginPage: SauceDemoLoginPage;
  sauceDemoProductsPage: SauseDemoProductsPage;
  amazonPage: AmazonPage;
  orangeHRMLoginPage: OrangeHRMLoginPage;
  orangeHRMHomePage: OrangeHRMHomePage;
  orangeHRMPersonalDetailsPage: OrangeHRMPersonalDetailsPage;
  globalsqaPage: GlobalsaPage;
  letCodePage: LetCodePage;
  sauceDemoAboutPage: SauceDemoAboutPage;
  sauceDemoCartPage: SauseDemoCartPage;
  sauceDemoCheckoutPage: SauceDemoCheckoutPage;
  flipkartPage: FlipkartPage;
  demoQAPage: DemoQAPage;
};

export const test = base.extend<Fixtures>({
  sauceDemoLoginPage: async ({ page }: { page: Page }, use) => {
    await use(new SauceDemoLoginPage(page));
  },

  sauceDemoProductsPage: async ({ page }: { page: Page }, use) => {
    await use(new SauseDemoProductsPage(page));
  },

  amazonPage: async ({ page }: { page: Page }, use) => {
    await use(new AmazonPage(page));
  },
  orangeHRMLoginPage: async ({ page }: { page: Page }, use) => {
    await use(new OrangeHRMLoginPage(page));
  },
  orangeHRMHomePage: async ({ page }: { page: Page }, use) => {
    await use(new OrangeHRMHomePage(page));
  },
  orangeHRMPersonalDetailsPage: async ({ page }: { page: Page }, use) => {
    await use(new OrangeHRMPersonalDetailsPage(page));
  },
  globalsqaPage: async ({ page }: { page: Page }, use) => {
    await use(new GlobalsaPage(page));
  },
  letCodePage: async ({ page }: { page: Page }, use) => {
    await use(new LetCodePage(page));
  },
  sauceDemoAboutPage: async ({ page }: { page: Page }, use) => {
    await use(new SauceDemoAboutPage(page));
  },
  sauceDemoCartPage: async ({ page }: { page: Page }, use) => {
    await use(new SauseDemoCartPage(page));
  },
  sauceDemoCheckoutPage: async ({ page }: { page: Page }, use) => {
    await use(new SauceDemoCheckoutPage(page));
  },  
  flipkartPage: async ({ page }: { page: Page }, use) => {
    await use(new FlipkartPage(page));
  },
  demoQAPage: async ({ page }: { page: Page }, use) => {
    await use(new DemoQAPage(page));
  },
});

// -------------------- ALLURE HOOK --------------------
// Attach screenshot, video, and trace after every test (pass or fail)
test.afterEach(async ({ page }, testInfo) => {
  // Screenshot
  const screenshot = testInfo.attachments.find(a => a.name === 'screenshot');
  if (screenshot?.path) {
    await allure.attachment('Screenshot', screenshot.path, 'image/png');
  }

  // Video & Trace
  for (const attachment of testInfo.attachments) {
    if (attachment.name === 'video' && attachment.path) {
      await allure.attachment('Video', attachment.path, 'video/webm');
    }
    if (attachment.name === 'trace' && attachment.path) {
      await allure.attachment('Trace', attachment.path, 'application/zip');
    }
  }
});





export { expect };
