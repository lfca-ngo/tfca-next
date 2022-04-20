import { expect, test } from '@playwright/test'

import { navigateToAction } from './utils/navigate-to-action.mjs'

const ACTION_ID = 'politics'

test(`Action ${ACTION_ID}`, async ({ baseURL, page }) => {
  await page.goto(baseURL)
  await navigateToAction(page, ACTION_ID)

  // Select DE country and enter zip
  await page.locator(`id=${ACTION_ID} >> data-testid=select`).click()
  await page.locator('data-testid=select-item-DE').click()
  await page.fill(
    `id=${ACTION_ID} >> data-testid=select-optional-input`,
    '12557'
  )
  await page
    .locator(`id=${ACTION_ID} >> data-testid=politics-filter-next-btn`)
    .click()

  // Select topic
  await page
    .locator(`id=${ACTION_ID} >> data-testid=radio-checkbox`)
    .nth(0)
    .click()
  await page
    .locator(`id=${ACTION_ID} >> data-testid=politics-filter-next-btn`)
    .click()

  // Select 2 politicians
  await page
    .locator(
      `id=${ACTION_ID} >> .content-card.politician >> nth=0 >> data-testid=politician-card-details-btn`
    )
    .click()
  await page
    .locator(
      `id=${ACTION_ID} >> .content-card.politician >> nth=1 >> data-testid=politician-card-details-btn`
    )
    .click()
  await page
    .locator(`id=${ACTION_ID} >> data-testid=politics-results-next-btn`)
    .click()

  // Send first email
  await page
    .locator(`id=${ACTION_ID} >> data-testid=politician-details-cta-btn`)
    .click()

  // Send second email with alternative text
  await page
    .locator(`id=${ACTION_ID} >> data-testid=dropdown-select-btn`)
    .nth(1)
    .click()
  await page
    .locator(
      'data-testid=dropdown-select-menu >> nth=0 >> data-testid=dropdown-select-item'
    )
    .nth(1)
    .click()
  await page
    .locator(`id=${ACTION_ID} >> data-testid=politician-details-cta-btn`)
    .click()

  // Expect to see success screen
  await expect(page.locator('data-testid=step-success')).toBeVisible()
})
