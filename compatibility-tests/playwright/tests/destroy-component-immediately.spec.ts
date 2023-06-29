import { expect, test } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.goto('http://localhost:4200/ng-on-destroy');
});

test.describe('ngOnDestroy', () => {
  test('destroying immediately after creation should not throw errors', async ({ page }) => {
    page.on('console', (msg) => console.log(msg.text()));
    await page.locator('#toggle').click();
    //    await page.locator('#show').click();
    //    await page.locator('#hide').click();
    expect(await page.screenshot()).toMatchSnapshot({ maxDiffPixelRatio: 0.001 });
  });
});
