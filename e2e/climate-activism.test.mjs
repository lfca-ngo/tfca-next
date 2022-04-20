import { expect, test } from '@playwright/test'

import { navigateToAction } from './utils/navigate-to-action.mjs'

const ACTION_ID = 'climate_activism'

test('Action climate_activism', async ({ baseURL, page }) => {
  await page.goto(baseURL)
  await navigateToAction(page, ACTION_ID)

  // Select what to do
  await page
    .locator(`id=${ACTION_ID} >> data-testid=radio-checkbox`)
    .nth(0)
    .click()
  await page.locator(`id=${ACTION_ID} >> data-testid=filter-submit-btn`).click()

  // Select area
  await page
    .locator(`id=${ACTION_ID} >> data-testid=radio-checkbox`)
    .nth(0)
    .click()
  await page.locator(`id=${ACTION_ID} >> data-testid=filter-submit-btn`).click()

  // Open details and navigate to external page
  await page
    .locator(`id=${ACTION_ID} >> .content-card.organization >> nth=0 >> button`)
    .click()
  await page.locator('data-testid=organization-details-cta-btn').nth(0).click()
  const [externalPage] = await Promise.all([
    page.waitForEvent('popup'),
    page.locator('data-testid=leave-page-link-btn').click(),
  ])

  await externalPage.waitForLoadState()

  // Make the action count
  page.bringToFront()
  await page.locator('data-testid=leave-page-count-btn').click()

  // Expect to see success screen
  await expect(page.locator('data-testid=step-success')).toBeVisible()
})
