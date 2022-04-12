import { expect, test } from '@playwright/test'

import { navigateToAction } from './utils/navigate-to-action.mjs'

test('Action Green Finances', async ({ baseURL, page }) => {
  await page.goto(baseURL)
  await navigateToAction(page, 'Support NGOs')

  // Select what to do
  await page.locator('span:has-text("Donate")').nth(2).click()
  await page
    .locator(
      'text=Select one or moreDonateVolunteerSubscribeContinue >> button'
    )
    .click()

  // Select area
  await page.locator('text=Justice').click()
  await page
    .locator(
      'text=Select one or moreJusticeCitiesCommunitiesLandForestsOceansContinue >> button'
    )
    .click()

  // Open details and navigate to external page
  await page
    .locator(
      'text=350.orgWorking to end the age of fossil fuelsDetails >> button'
    )
    .click()
  await page.locator('button:has-text("Make a donation")').click()
  const [externalPage] = await Promise.all([
    page.waitForEvent('popup'),
    page
      .locator('div[role="document"] button:has-text("Make a donation")')
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
