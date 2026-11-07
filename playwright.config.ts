import { defineConfig, devices } from '@playwright/test'

const externalPreview = process.env.PREVIEW_BASE_URL

export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  workers: process.env.CI ? 2 : 4,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 1 : 0,
  reporter: [
    ['list'],
    ['html', { open: 'never' }],
    ['json', { outputFile: '.cache/react19-validation/results.json' }],
  ],
  use: {
    baseURL: externalPreview || 'http://127.0.0.1:2034/react-sdk-demo/',
    channel: 'chromium',
    trace: 'retain-on-failure',
    screenshot: 'only-on-failure',
  },
  projects: [
    { name: 'desktop', use: { ...devices['Desktop Chrome'] } },
    { name: 'mobile', use: { ...devices['iPhone 13'], defaultBrowserType: 'chromium' } },
  ],
  webServer: externalPreview ? undefined : {
    command: 'pnpm preview --host 127.0.0.1 --port 2034 --strictPort',
    url: 'http://127.0.0.1:2034/react-sdk-demo/',
    reuseExistingServer: !process.env.CI,
  },
})
