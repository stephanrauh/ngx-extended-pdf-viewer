import { expect, test } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.goto('http://localhost:4200');
});

test.describe('Smoketest', () => {
  test('at least one page renders', async ({ page }) => {
    await page.waitForSelector('.visiblePageIsLoading');
    await expect(page.locator('.visiblePageIsLoading')).toBeVisible();
    await page.locator('[data-page-number]="19"');
    await page.locator('[data-page-number]="19" > canvas');
    await expect(page.locator('small')).toContainText('Copyright hint: the PDF file has been published by');
    await expect(page.locator('#primaryPageRotateCw')).not.toBeDisabled();
    await expect(page.locator('[data-page-number="19"]')).toBeVisible();
    await page.waitForSelector(':nth-match(.page canvas,1)');
    await expect(page.locator('.visiblePageIsLoading')).not.toBeVisible();
    await expect(page.locator(':nth-match(.loadingInProgress,1)')).not.toBeVisible();
    expect(await page.screenshot()).toMatchSnapshot({ maxDiffPixelRatio: 0.001 });
  });
});
