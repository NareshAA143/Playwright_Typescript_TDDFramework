import { test as base, Page, expect } from '@playwright/test';
import * as dotenv from 'dotenv';
import * as path from 'path';
import { allure } from 'allure-playwright';

// Load .env from configs folder
dotenv.config({ path: path.resolve(__dirname, 'configs/.env') });

console.log('BASE_URL loaded:', process.env.BASE_URL); // Optional: check it loads
import { SauceDemoLoginPage } from './pages/SauceDemoLoginPage';
import { SauseDemoProductsPage } from './pages/SauceDemoProductsPage';

type Fixtures = {
  sauceDemoLoginPage: SauceDemoLoginPage;
  sauceDemoProductsPage: SauseDemoProductsPage;
};

export const test = base.extend<Fixtures>({
  sauceDemoLoginPage: async ({ page }: { page: Page }, use) => {
    await use(new SauceDemoLoginPage(page));
  },

  sauceDemoProductsPage: async ({ page }: { page: Page }, use) => {
    await use(new SauseDemoProductsPage(page));
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
