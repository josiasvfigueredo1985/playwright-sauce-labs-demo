import { expect, test as base } from '@playwright/test';
import type { Page } from '@playwright/test';
import type { IUrlActions } from '../../framework/interfaces/i-url-actions';
import type { IRoutablePage } from '../../framework/interfaces/i-routable-page';

type Fixtures = {
  url: IUrlActions;
};

function createUrlActions(page: Page, baseURL: string): IUrlActions {
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
