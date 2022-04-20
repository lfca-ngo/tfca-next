/** @type {import('@playwright/test').PlaywrightTestConfig} */
const config = {
  use: {
    baseURL: process.env.PLAYWRIGHT_TEST_BASE_URL || 'http://localhost:3000',
    browserName: 'chromium',
    headless: true,
    launchOptions: {
      slowMo: 0,
    },
    locale: 'de',
    permissions: ['clipboard-read'],
    screenshot: 'only-on-failure',
  },
}

module.exports = config
