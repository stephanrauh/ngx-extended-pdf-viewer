import { expect, test } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  // await page.goto('http://localhost:4200/absolute-asset-path');
});

test.describe('standard-fonts-and-cmaps', () => {
  test('everything works if the assets path is an absolute URL', async ({ page }) => {
    await loadTwoPages(page);
  });

  test('everything works if the assets path is an absolute URL - bleeding edge', async ({ page }) => {
    await loadTwoPages(page, '?bleeding-edge');
  });
});

async function loadTwoPages(page, urlSuffix = '') {
  page.on('console', (msg) => console.log(msg.text()));
  await page.goto(`http://localhost:4200/standard-fonts-and-cmaps?bleeding-edge${urlSuffix}`);
  await loadAndDisplayPage(page);
  await page.goto(`http://localhost:4200/zapfdingbats${urlSuffix}`);
  await loadAndDisplayPage(page);
}

async function loadAndDisplayPage(page) {
  await page.waitForSelector('.visiblePageIsLoading');
  await expect(page.locator('.visiblePageIsLoading')).toBeVisible();
  await expect(page.locator('.visiblePageIsLoading')).not.toBeVisible();
  await page.waitForTimeout(1000);
  expect(await page.screenshot()).toMatchSnapshot({ maxDiffPixelRatio: 0.001 });
}
