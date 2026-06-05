import { test, expect } from '@playwright/test';
// The showcase POM is copied into ./poms/ by test.sh before each run. We
// can't reach across to the showcase tree via relative import because the
// POM's own `import { ... } from '@playwright/test'` would then resolve
// from showcase/node_modules — Playwright detects two installations being
// loaded simultaneously and aborts the run.
import { PdfViewerPage } from '../poms/pdf-viewer.page';

// Capture browser-side diagnostics so failures don't disappear into the
// trace. Stashed on the page object so afterEach can drain them.
test.beforeEach(async ({ page }) => {
  const consoleMessages: string[] = [];
  const failures: string[] = [];
  page.on('console', (msg) => consoleMessages.push(`[${msg.type()}] ${msg.text()}`));
  page.on('pageerror', (err) => consoleMessages.push(`[pageerror] ${err.message}`));
  page.on('response', (res) => {
    if (res.status() >= 400) failures.push(`${res.status()} ${res.url()}`);
  });
  (page as any).__capture = { consoleMessages, failures };
});

test.afterEach(async ({ page }, testInfo) => {
  const cap = (page as any).__capture as
    | { consoleMessages: string[]; failures: string[] }
    | undefined;
  if (!cap) return;
  if (cap.consoleMessages.length) {
    await testInfo.attach('console.log', {
      body: cap.consoleMessages.join('\n'),
      contentType: 'text/plain',
    });
  }
  if (cap.failures.length) {
    await testInfo.attach('failed-requests.log', {
      body: cap.failures.join('\n'),
      contentType: 'text/plain',
    });
  }
  if (testInfo.status !== testInfo.expectedStatus) {
    /* eslint-disable no-console */
    if (cap.failures.length) {
      console.log(`\n=== failed requests for "${testInfo.title}" ===`);
      console.log(cap.failures.join('\n'));
    }
    if (cap.consoleMessages.length) {
      console.log(`=== console for "${testInfo.title}" ===`);
      console.log(cap.consoleMessages.join('\n'));
    }
    /* eslint-enable no-console */
  }
});

const ANGULAR_VERSION = process.env.COMPAT_ANGULAR_VERSION ?? 'current';

test.describe.configure({ mode: 'parallel' });

test.describe(`Angular ${ANGULAR_VERSION} — ngx-extended-pdf-viewer compat`, () => {
  test('NgModule consumer: viewer boots and paints a canvas', async ({ page }) => {
    const viewer = new PdfViewerPage(page);
    await viewer.goto('/smoketest');
    await viewer.waitForFirstPageRender();
    await viewer.assertCanvasHasContent();
  });

  test('NgModule consumer: clicking Next advances [(page)] two-way binding', async ({
    page,
  }) => {
    const viewer = new PdfViewerPage(page);
    await viewer.goto('/smoketest');
    await viewer.waitForFirstPageRender();

    // #page-value reflects the component's `page` field via {{ page }}; if
    // the [(page)] round-trip works, it advances when we click #page-button
    // (the click → component → input → viewer → output → component path).
    await expect(page.locator('#page-value')).toHaveText('1');
    await page.locator('button#page-button').click();
    await expect(page.locator('#page-value')).toHaveText('2');
    await viewer.waitForPageRender(2);
    await viewer.assertCanvasHasContent(2);
  });

  test('Standalone consumer: viewer boots and paints a canvas', async ({ page }) => {
    const viewer = new PdfViewerPage(page);
    await viewer.goto('/standalone-smoketest');
    await viewer.waitForFirstPageRender();
    await viewer.assertCanvasHasContent();
  });

  test('Standalone consumer: clicking Next advances [(page)] two-way binding', async ({
    page,
  }) => {
    const viewer = new PdfViewerPage(page);
    await viewer.goto('/standalone-smoketest');
    await viewer.waitForFirstPageRender();

    await expect(page.locator('#page-value')).toHaveText('1');
    await page.locator('button#page-button').click();
    await expect(page.locator('#page-value')).toHaveText('2');
    await viewer.waitForPageRender(2);
    await viewer.assertCanvasHasContent(2);
  });

  test('@if mount/unmount/remount keeps the viewer rendering', async ({ page }) => {
    const viewer = new PdfViewerPage(page);
    await viewer.goto('/ng-on-destroy');
    await viewer.waitForFirstPageRender();
    await viewer.assertCanvasHasContent();

    await page.locator('button#hide').click();
    await viewer.viewerHost.waitFor({ state: 'detached' });

    await page.locator('button#show').click();
    await viewer.waitForFirstPageRender();
    await viewer.assertCanvasHasContent();
  });
});
