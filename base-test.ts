import { test as base, Page, expect } from '@playwright/test';
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

export { expect };
