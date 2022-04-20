import { test } from '@playwright/test'

import { leavePageAndCount } from './utils/leave-page-and-count.mjs'
import { navigateToAction } from './utils/navigate-to-action.mjs'

const ACTION_ID = 'climate_activism'

test(`Action ${ACTION_ID}`, async ({ baseURL, page }) => {
  await page.goto(baseURL)
  await navigateToAction(page, ACTION_ID)

  // Select what to do
  await page
    .locator(`id=${ACTION_ID} >> data-testid=radio-checkbox`)
    .nth(0)
    .click()
  await page
    .locator(`id=${ACTION_ID} >> data-testid=action-finder-filter-submit-btn`)
    .click()

  // Select area
  await page
    .locator(`id=${ACTION_ID} >> data-testid=radio-checkbox`)
    .nth(0)
    .click()
  await page
    .locator(`id=${ACTION_ID} >> data-testid=action-finder-filter-submit-btn`)
    .click()

  // Open details and navigate to external page
  await page
    .locator(`id=${ACTION_ID} >> .content-card.organization >> nth=0 >> button`)
    .click()
  await page.locator('data-testid=organization-details-cta-btn').nth(0).click()
  await leavePageAndCount(page)
})
