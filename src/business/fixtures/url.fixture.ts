import { expect, test as base } from '@playwright/test';
import type { Page } from '@playwright/test';
import type { IRoutablePage } from '../../framework/interfaces/i-routable-page';

export interface UrlActions {
  build(path: string): string;
  goto(target: IRoutablePage): Promise<void>;
  isAt(target: IRoutablePage): boolean;
  expect(target: IRoutablePage): Promise<void>;
}

type Fixtures = {
  url: UrlActions;
};

function createUrlActions(page: Page, baseURL: string): UrlActions {
  const build = (path: string): string => new URL(path, baseURL).toString();

  return {
    build,
    async goto(target: IRoutablePage): Promise<void> {
      await page.goto(build(target.path));
    },
    isAt(target: IRoutablePage): boolean {
      return page.url() === build(target.path);
    },
    async expect(target: IRoutablePage): Promise<void> {
      await expect(page).toHaveURL(build(target.path));
    },
  };
}

export const test = base.extend<Fixtures>({
  url: async ({ page }, use, testInfo) => {
    const baseURL = testInfo.project.use.baseURL;
    if (typeof baseURL !== 'string') {
      throw new Error('The url fixture requires baseURL to be configured in Playwright.');
    }

    await use(createUrlActions(page, baseURL));
  },
});

export { expect };
