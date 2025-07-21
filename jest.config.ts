import type { Config } from 'jest';

const config: Config = {
  verbose: true,
  preset: 'jest-preset-angular',
  setupFilesAfterEnv: ['<rootDir>/setup-jest.ts'],
  roots: ['<rootDir>/projects/ngx-extended-pdf-viewer/src'],
  testEnvironment: 'jsdom',
};

export default config;
