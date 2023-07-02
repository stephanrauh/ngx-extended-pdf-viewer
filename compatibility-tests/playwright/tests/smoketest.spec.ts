import { expect, test } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  // await page.goto('http://localhost:4200/smoketest');
});

test.describe('Smoketest', () => {
  test('at least one page renders', async ({ page }) => {
    await page.goto('http://localhost:4200/smoketest');
    await runBasicTests(page);
  });

  test('at least one page renders - bleeding edge', async ({ page }) => {
    await page.goto('http://localhost:4200/smoketest?bleeding-edge');
    await runBasicTests(page);
  });
});

async function runBasicTests(page) {
  page.on('console', (msg) => console.log(msg.text()));
  await page.waitForSelector('.visiblePageIsLoading');
  await expect(page.locator('.visiblePageIsLoading')).toBeVisible();
  await expect(page.locator('.visiblePageIsLoading')).not.toBeVisible();
  await page.locator('[data-page-number]="19" > canvas');
  expect(await page.locator('ngx-extended-pdf-viewer').screenshot()).toMatchSnapshot({ maxDiffPixelRatio: 0.001 });
  await expect(page.locator('#primaryPageRotateCw')).not.toBeDisabled();
  await expect(page.locator('.page[data-page-number="19"]')).toBeVisible();
  await page.waitForSelector(':nth-match(.page canvas,1)');
  await expect(page.locator('.visiblePageIsLoading')).not.toBeVisible();
  // await expect(page.locator(':nth-match(.loadingInProgress,1)')).not.toBeVisible();
  expect(await page.locator('pdf-toolbar').screenshot()).toMatchSnapshot({ maxDiffPixelRatio: 0.001 });
  expect(await page.locator('ngx-extended-pdf-viewer').screenshot()).toMatchSnapshot({ maxDiffPixelRatio: 0.001 });

  await page.locator('#page-button').click();
  expect(await page.locator('ngx-extended-pdf-viewer').screenshot()).toMatchSnapshot({ maxDiffPixelRatio: 0.001 });
  await page.locator('#next').click();
  expect(await page.locator('ngx-extended-pdf-viewer').screenshot()).toMatchSnapshot({ maxDiffPixelRatio: 0.001 });

  await page.locator('#rotate-button').click();
  expect(await page.locator('ngx-extended-pdf-viewer').screenshot()).toMatchSnapshot({ maxDiffPixelRatio: 0.001 });
  await page.locator('#primaryPageRotateCw').click();
  expect(await page.locator('ngx-extended-pdf-viewer').screenshot()).toMatchSnapshot({ maxDiffPixelRatio: 0.001 });

  await page.locator('#zoom-button').click();
  expect(await page.locator('ngx-extended-pdf-viewer').screenshot()).toMatchSnapshot({ maxDiffPixelRatio: 0.001 });
  await page.locator('#zoomOut').click();
  expect(await page.locator('ngx-extended-pdf-viewer').screenshot()).toMatchSnapshot({ maxDiffPixelRatio: 0.001 });

  await page.locator('#zoom-auto-button').click();
  expect(await page.locator('ngx-extended-pdf-viewer').screenshot()).toMatchSnapshot({ maxDiffPixelRatio: 0.001 });
  await page.locator('#spread-button').click();
  expect(await page.locator('ngx-extended-pdf-viewer').screenshot()).toMatchSnapshot({ maxDiffPixelRatio: 0.001 });
  await page.locator('#secondaryToolbarToggle').click();
  expect(await page.locator('ngx-extended-pdf-viewer').screenshot()).toMatchSnapshot({ maxDiffPixelRatio: 0.001 });
  await page.locator('#spreadEven').click();
  expect(await page.locator('ngx-extended-pdf-viewer').screenshot()).toMatchSnapshot({ maxDiffPixelRatio: 0.001 });
}
