import { expect, test } from '@playwright/test'

import { navigateToAction } from './utils/navigate-to-action.mjs'

test('Action Digital', async ({ baseURL, page }) => {
  await page.goto(baseURL)
  await navigateToAction(page, 'Digital')

  // Show details
  await page
    .locator('text=EcosiaPlant trees with your searchesDetails >> button')
    .click()

  // Open details and navigate to external page
  await page.locator('button:has-text("Download for Android")').click()
  const [externalPage] = await Promise.all([
    page.waitForEvent('popup'),
    page
      .locator('div[role="document"] button:has-text("Download for Android")')
      .click(),
  ])

  await externalPage.waitForLoadState()

  // Make the action count
  page.bringToFront()
  await page.locator('button:has-text("Count me in")').click()

  // Expect to see success screen
  await expect(
    page.locator('text=High five! Now, nominate friends to triple your impact')
  ).toBeVisible()
})
