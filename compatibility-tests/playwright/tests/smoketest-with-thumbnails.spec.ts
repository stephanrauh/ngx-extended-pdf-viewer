import { expect, test } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  // await page.goto('http://localhost:4200/smoketest');
});

test.describe('Smoketest with thumbnails', () => {
  test('at least one page renders', async ({ page }) => {
    await page.goto('http://localhost:4200/smoketest-with-thumbnails');
    await runBasicTests(page);
  });

  test('at least one page renders - bleeding edge', async ({ page }) => {
    await page.goto('http://localhost:4200/smoketest-with-thumbnails?bleeding-edge');
    await runBasicTests(page);
  });
});

async function runBasicTests(page) {
  page.on('console', (msg) => console.log(msg.text()));
  await page.locator('[data-page-number]="19" > canvas');
  expect(await page.locator('ngx-extended-pdf-viewer').screenshot()).toMatchSnapshot({ maxDiffPixelRatio: 0.001 });
  await expect(page.locator('#primaryPageRotateCw')).not.toBeDisabled();
  await expect(page.locator('.page[data-page-number="19"]')).toBeVisible();
  await page.waitForSelector(':nth-match(.page canvas,1)');
  expect(await page.locator('pdf-toolbar').screenshot()).toMatchSnapshot({ maxDiffPixelRatio: 0.001 });
  expect(await page.locator('ngx-extended-pdf-viewer').screenshot()).toMatchSnapshot({ maxDiffPixelRatio: 0.001 });

  await page.locator('#sidebar-button').click();
  await page.waitForTimeout(250);
  expect(await page.locator('ngx-extended-pdf-viewer').screenshot()).toMatchSnapshot({ maxDiffPixelRatio: 0.001 });

  await page.locator('#page-button').click();
  expect(await page.locator('ngx-extended-pdf-viewer').screenshot()).toMatchSnapshot({ maxDiffPixelRatio: 0.001 });
  await page.locator('#next').click();
  expect(await page.locator('ngx-extended-pdf-viewer').screenshot()).toMatchSnapshot({ maxDiffPixelRatio: 0.001 });

  await page.locator('#rotate-button').click();
  await page.waitForTimeout(500);
  expect(await page.locator('ngx-extended-pdf-viewer').screenshot()).toMatchSnapshot({ maxDiffPixelRatio: 0.001 });

  // when rotating the page, the thumbnails are not updated fast enough, so let's skip this test
  await page.locator('#primaryPageRotateCw').click();
  await page.waitForTimeout(500);
  expect(await page.locator('ngx-extended-pdf-viewer').screenshot()).toMatchSnapshot({ maxDiffPixelRatio: 0.001 });

  await page.locator('#zoom-button').click();
  expect(await page.locator('ngx-extended-pdf-viewer').screenshot()).toMatchSnapshot({ maxDiffPixelRatio: 0.001 });
  await page.locator('#zoomOut').click();
  expect(await page.locator('ngx-extended-pdf-viewer').screenshot()).toMatchSnapshot({ maxDiffPixelRatio: 0.001 });

  await page.locator('#zoom-auto-button').click();
  expect(await page.locator('ngx-extended-pdf-viewer').screenshot()).toMatchSnapshot({ maxDiffPixelRatio: 0.001 });
  await page.locator('#spread-button').click();
  await page.waitForTimeout(250);
  expect(await page.locator('ngx-extended-pdf-viewer').screenshot()).toMatchSnapshot({ maxDiffPixelRatio: 0.001 });
  await page.locator('#secondaryToolbarToggle').click();
  expect(await page.locator('ngx-extended-pdf-viewer').screenshot()).toMatchSnapshot({ maxDiffPixelRatio: 0.001 });
  await page.locator('#secondarySpreadEven').click();
  await page.waitForTimeout(250);
  expect(await page.locator('ngx-extended-pdf-viewer').screenshot()).toMatchSnapshot({ maxDiffPixelRatio: 0.001 });
}
