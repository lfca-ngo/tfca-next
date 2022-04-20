import { expect, test } from '@playwright/test'

import { navigateToAction } from './utils/navigate-to-action.mjs'

test.skip('Action Green Finances', async ({ baseURL, page }) => {
  await page.goto(baseURL)
  await navigateToAction(page, 'Banking')

  // Select Banking
  await page.locator('text=BankingInvestment >> img').nth(0).click()
  await page
    .locator('text=Select one or moreBankingInvestmentContinue >> button')
    .click()

  // Select more filters from dropdown
  await page.locator('button:has-text("Please select an option")').click()
  await page.locator('text=Girokonto').click()
  await page.locator('button:has-text("Please select")').click()
  await page.locator('text=High').click()

  // Open details and navigate to external page
  await page.locator('button:has-text("Show details")').click()
  await page.locator('button:has-text("Continue to Tomorrow")').click()
  const [externalPage] = await Promise.all([
    page.waitForEvent('popup'),
    page
      .locator('div[role="document"] button:has-text("Continue to Tomorrow")')
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
