import { expect, test } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  // await page.goto('http://localhost:4200/absolute-asset-path');
});

test.describe('src attribute', () => {
  test('the PDF is updated when [src] changes', async ({ page }) => {
    page.on('console', (msg) => console.log(msg.text()));
    await runTest(page);
  });

  test('the PDF is updated when [src] changes - bleeding edge', async ({ page }) => {
    page.on('console', (msg) => console.log(msg.text()));
    await runTest(page, '?bleeding-edge');
  });
});

async function runTest(page, urlSuffix = '') {
  await page.goto(`http://localhost:4200/zapfdingbats${urlSuffix}`);
  await page.waitForSelector('.visiblePageIsLoading');
  await expect(page.locator('.visiblePageIsLoading')).toBeVisible();
  await expect(page.locator('.visiblePageIsLoading')).not.toBeVisible();
  await page.waitForTimeout(500);
  expect(await page.screenshot()).toMatchSnapshot({ maxDiffPixelRatio: 0.001 });
  await page.locator('#switch-button').click();
  await page.waitForTimeout(500);
  expect(await page.screenshot()).toMatchSnapshot({ maxDiffPixelRatio: 0.001 });
}
