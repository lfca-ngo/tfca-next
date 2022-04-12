import { expect, test } from '@playwright/test'

import { navigateToAction } from './utils/navigate-to-action.mjs'

test('Action Politics', async ({ baseURL, page }) => {
  await page.goto(baseURL)
  await navigateToAction(page, 'Politics')

  // Select country and enter zip
  await page.locator('input[role="combobox"]').click()
  await page.locator('text=Germany').click()
  await page.locator('[placeholder="Deine PLZ"]').click()
  await page.locator('[placeholder="Deine PLZ"]').fill('12557')
  await page.locator('text=GermanyContinue >> button').click()

  // Select topic
  await page.locator('#rc-tabs-0-panel-badges >> text=Energy').click()
  await page
    .locator('text=EnergyAgricultureDivestmentGeneralContinue >> button')
    .click()

  // Select 2 politicians
  await page.locator('text=Die LinkeSelect >> button').click()
  await page.locator('text=CSUSelect >> button').click()
  await page.locator('text=2Continue').click()

  // Send first email
  await page.locator('button:has-text("Open E-Mail")').click()

  // Send second email with alternative text
  await page.locator('button:has-text("Please select")').click()
  await page.locator('text=Message 2').click()
  await page.locator('button:has-text("Open E-Mail")').click()

  // Expect to see success screen
  await expect(
    page.locator('text=High five! Now, nominate friends to triple your impact')
  ).toBeVisible()
})
