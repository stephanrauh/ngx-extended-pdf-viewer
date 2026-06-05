import { defineConfig, devices } from '@playwright/test';

/**
 * Cross-Angular compatibility runner.
 *
 * Each Angular-version harness (Angular22/, Angular21/, ...) builds a Docker
 * image that serves the demo on its own port via nginx. `test.sh` starts the
 * container, sets COMPAT_BASE_URL, and runs `playwright test` from this
 * directory. The same spec is reused for every Angular version — the only
 * variable is the URL the tests hit.
 */
const BASE_URL = process.env.COMPAT_BASE_URL ?? 'http://localhost:4200';
const ANGULAR_VERSION = process.env.COMPAT_ANGULAR_VERSION ?? 'unspecified';

export default defineConfig({
  testDir: './tests',
  outputDir: './.playwright-results',
  fullyParallel: true,
  retries: process.env.CI ? 1 : 0,
  reporter: [
    ['list'],
    ['html', { outputFolder: './.playwright-report', open: 'never' }],
  ],

  timeout: 60_000,
  expect: { timeout: 10_000 },

  use: {
    baseURL: BASE_URL,
    trace: 'retain-on-failure',
    screenshot: 'only-on-failure',
    actionTimeout: 15_000,
    navigationTimeout: 30_000,
  },

  metadata: { angularVersion: ANGULAR_VERSION },

  projects: [
    {
      name: 'chromium',
      use: {
        ...devices['Desktop Chrome'],
        viewport: { width: 1600, height: 1000 },
      },
    },
  ],
});
