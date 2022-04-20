import { test } from '@playwright/test'

import { leavePageAndCount } from './utils/leave-page-and-count.mjs'
import { navigateToAction } from './utils/navigate-to-action.mjs'

const ACTION_ID = 'ecosia'

test(`Action ${ACTION_ID}`, async ({ baseURL, page }) => {
  await page.goto(baseURL)
  await navigateToAction(page, ACTION_ID)

  // Open details and navigate to external page
  await page
    .locator(`id=${ACTION_ID} >> .content-card.tool >> nth=0 >> button`)
    .click()
  await page.locator('data-testid=tool-details-cta-btn').nth(0).click()
  await leavePageAndCount(page)
})
