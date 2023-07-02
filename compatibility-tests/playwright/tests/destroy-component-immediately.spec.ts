import { expect, test } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  // await page.goto('http://localhost:4200/ng-on-destroy');
});

test.describe('ngOnDestroy', () => {
  test('destroying immediately after creation should not throw errors', async ({ page }) => {
    await page.goto('http://localhost:4200/ng-on-destroy');
    page.on('console', (msg) => console.log(msg.text()));
    await page.locator('#toggle').click();
    expect(await page.screenshot()).toMatchSnapshot({ maxDiffPixelRatio: 0.001 });
  });

  test('destroying immediately after creation should not throw errors - bleeding edge', async ({ page }) => {
    await page.goto('http://localhost:4200/ng-on-destroy?bleeding-edge');
    page.on('console', (msg) => console.log(msg.text()));
    await page.locator('#toggle').click();
    expect(await page.screenshot()).toMatchSnapshot({ maxDiffPixelRatio: 0.001 });
  });
});
