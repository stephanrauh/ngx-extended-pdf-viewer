import { expect, test } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  page.on('console', (msg) => console.log(msg.text()));
});

test.describe('finding programatically', () => {
  test('Find API, events, and search results', async ({ page }) => {
    await runTest(page);
  });

  test('Find API, events, and search results - bleeding edge', async ({ page }) => {
    await runTest(page, '?bleeding-edge');
  });
});

async function runTest(page, urlSuffix = '') {
  await page.goto(`http://localhost:4200/find${urlSuffix}`);
  await page.waitForSelector('.visiblePageIsLoading');
  // await expect(page.locator('.visiblePageIsLoading')).toBeVisible();
  await expect(page.locator('.visiblePageIsLoading')).not.toBeVisible();
  await page.waitForTimeout(500);
  expect(await page.screenshot()).toMatchSnapshot({ maxDiffPixelRatio: 0.001 });
  await page.locator('#primaryViewFind').click();
  await page.waitForTimeout(500);
  expect(await page.screenshot()).toMatchSnapshot({ maxDiffPixelRatio: 0.001 });
  await page.locator('#highlightAll').click();
  await page.waitForTimeout(500);
  expect(await page.screenshot()).toMatchSnapshot({ maxDiffPixelRatio: 0.001 });

  await page.locator('#searchtext').fill('nasality');
  await page.waitForTimeout(500);
  expect(await page.screenshot()).toMatchSnapshot({ maxDiffPixelRatio: 0.001 });

  await page.locator('#findInput').fill('nasali');
  await page.waitForTimeout(500);
  expect(await page.screenshot()).toMatchSnapshot({ maxDiffPixelRatio: 0.001 });

  await page.locator('#wholeWord').click();
  await page.waitForTimeout(500);
  expect(await page.screenshot()).toMatchSnapshot({ maxDiffPixelRatio: 0.001 });

  await page.locator('#findInput').fill('nasal');
  await page.waitForTimeout(500);
  expect(await page.screenshot()).toMatchSnapshot({ maxDiffPixelRatio: 0.001 });

  await page.locator('#findEntireWord').click();
  await page.waitForTimeout(500);
  expect(await page.screenshot()).toMatchSnapshot({ maxDiffPixelRatio: 0.001 });

  await page.locator('#matchCase').click();
  await page.waitForTimeout(500);
  expect(await page.screenshot()).toMatchSnapshot({ maxDiffPixelRatio: 0.001 });

  await page.locator('#findMatchCase').click();
  await page.waitForTimeout(500);
  expect(await page.screenshot()).toMatchSnapshot({ maxDiffPixelRatio: 0.001 });

  await page.locator('#findInput').fill('licao');
  await page.waitForTimeout(500);
  expect(await page.screenshot()).toMatchSnapshot({ maxDiffPixelRatio: 0.001 });

  await page.locator('#matchDiacritics').click();
  await page.waitForTimeout(500);
  expect(await page.screenshot()).toMatchSnapshot({ maxDiffPixelRatio: 0.001 });

  await page.locator('#findMatchDiacritics').click();
  await page.waitForTimeout(500);
  expect(await page.screenshot()).toMatchSnapshot({ maxDiffPixelRatio: 0.001 });

  await page.locator('#gotoNextPage').click();
  await page.waitForTimeout(500);
  expect(await page.screenshot()).toMatchSnapshot({ maxDiffPixelRatio: 0.001 });

  await page.locator('#gotoPreviousPage').click();
  await page.waitForTimeout(500);
  expect(await page.screenshot()).toMatchSnapshot({ maxDiffPixelRatio: 0.001 });

  await page.locator('#findNext').click();
  await page.waitForTimeout(500);
  expect(await page.screenshot()).toMatchSnapshot({ maxDiffPixelRatio: 0.001 });

  await page.locator('#findPrevious').click();
  await page.waitForTimeout(500);
  expect(await page.screenshot()).toMatchSnapshot({ maxDiffPixelRatio: 0.001 });

  await page.locator('#findbarVisible').click();
  await page.waitForTimeout(50);
  expect(await page.screenshot()).toMatchSnapshot({ maxDiffPixelRatio: 0.001 });
}
