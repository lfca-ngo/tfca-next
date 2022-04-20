import { test } from '@playwright/test'

import { leavePageAndCount } from './utils/leave-page-and-count.mjs'
import { navigateToAction } from './utils/navigate-to-action.mjs'

const ACTION_ID = 'green_finances'

test(`Action ${ACTION_ID}`, async ({ baseURL, page }) => {
  await page.goto(baseURL)
  await navigateToAction(page, ACTION_ID)

  // Select Banking
  await page
    .locator(`id=${ACTION_ID} >> data-testid=radio-checkbox`)
    .nth(0)
    .click()
  await page
    .locator(`id=${ACTION_ID} >> data-testid=action-finder-filter-submit-btn`)
    .click()

  // Select more filters from dropdown
  await page
    .locator(`id=${ACTION_ID} >> data-testid=dropdown-select-btn`)
    .nth(1)
    .click()
  await page
    .locator(
      'data-testid=dropdown-select-menu >> nth=0 >> data-testid=dropdown-select-item'
    )
    .nth(0)
    .click()

  await page
    .locator(`id=${ACTION_ID} >> data-testid=dropdown-select-btn`)
    .nth(2)
    .click()
  await page
    .locator(
      'data-testid=dropdown-select-menu >> nth=1 >> data-testid=dropdown-select-item'
    )
    .nth(0)
    .click()

  // Open details and navigate to external page
  await page
    .locator(
      `id=${ACTION_ID} >> .content-card.bank >> nth=0 >> data-testid=bank-card-details-btn`
    )
    .click()
  await page.locator('data-testid=bank-details-cta-btn').nth(0).click()
  await leavePageAndCount(page)
})
