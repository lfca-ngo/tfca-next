import { expect, test } from '@playwright/test'

import { navigateToAction } from './utils/navigate-to-action.mjs'

test('Action Green Finances', async ({ baseURL, page }) => {
  await page.goto(baseURL)
  await navigateToAction(page, 'Action at work')

  // Select role
  await page.locator('text=Operations & Facilities').click()
  await page
    .locator(
      'text=At workEvery job is a climate job — yes, yours too!Tap your role to explore acti >> button'
    )
    .click()

  // Select area
  await page.locator('#rc-tabs-2-panel-areas >> text=Energy').click()
  await page
    .locator(
      'text=Select one or moreEnergyInvestmentsEmissionsAdvocacyGeneralContinue >> button'
    )
    .click()

  // Open details and navigate to external page
  await page.locator('.ant-card-body').first().click()
  await page.locator('button:has-text("Read article")').click()
  const [externalPage] = await Promise.all([
    page.waitForEvent('popup'),
    page
      .locator('div[role="document"] button:has-text("Read article")')
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
