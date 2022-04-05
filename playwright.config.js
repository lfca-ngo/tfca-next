// playwright.config.js
// @ts-check
const { devices } = require('@playwright/test')

/** @type {import('@playwright/test').PlaywrightTestConfig} */
const config = {
  use: {
    browserName: 'chromium',
    headless: true,
    launchOptions: {
      slowMo: 0,
    },
    screenshot: 'only-on-failure',
  },
}

module.exports = config
