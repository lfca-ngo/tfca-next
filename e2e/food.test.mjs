import { expect, test } from '@playwright/test'

import { navigateToAction } from './utils/navigate-to-action.mjs'

test.skip('Action Food', async ({ baseURL, page }) => {
  await page.goto(baseURL)
  await navigateToAction(page, 'Food')

  // Take quiz
  await page.locator('button:has-text("Take the quiz")').click()

  // Question #1
  await page.locator('text=Reducing food waste').click()
  await page.locator('button:has-text("Submit")').click()
  await page
    .locator('#rc-tabs-4-panel-solution_answer button:has-text("Continue")')
    .click()

  // Question #2
  await page.locator('span:has-text("40%")').nth(2).click()
  await page.locator('button:has-text("Submit")').click()
  await page
    .locator('#rc-tabs-4-panel-carbon_answer button:has-text("Continue")')
    .click()

  // Question #3
  await page.locator('label:has-text("1400 €")').click()
  await page.locator('button:has-text("Submit")').click()
  await page
    .locator('#rc-tabs-4-panel-question_answer button:has-text("Continue")')
    .click()

  // Question #4
  await page.locator('text=Planning meals and writing shopping lists').click()
  await page.locator('text=Freezing my food').click()
  await page
    .locator(
      'text=Using wilted fruits for smoothies, and wilted veggies and meat scraps for soup'
    )
    .click()
  await page.locator('text=Adjust the temperature setting of my fridge').click()
  await page.locator('text=Buying food that is about to expire').click()
  await page.locator('button:has-text("Submit")').click()
  await page
    .locator('#rc-tabs-4-panel-reduce-how_answer button:has-text("Continue")')
    .click()

  // Question #5
  await page.locator('text=Polluted air and water').click()
  await page.locator('text=Reduced hunger worldwide').click()
  await page.locator('button:has-text("Submit")').click()
  await page
    .locator(
      '#rc-tabs-4-panel-mass-production-animals_answer button:has-text("Continue")'
    )
    .click()

  // Question #6
  await page.locator('text=Lower rates of chronic diseases').click()
  await page
    .locator('text=Increase agricultural diversity and communities resilience')
    .click()
  await page.locator('button:has-text("Submit")').click()
  await page
    .locator(
      '#rc-tabs-4-panel-impact-plant-based_answer button:has-text("Continue")'
    )
    .click()

  // Question #7
  await page.locator('text=To be ready to make a habit change').click()
  await page.locator('button:has-text("Submit")').click()
  await page
    .locator(
      '#rc-tabs-4-panel-need-to-start_answer button:has-text("Continue")'
    )
    .click()

  // Open details and navigate to external page
  await page.locator('button:has-text("Too Good to Go")').click()
  const [externalPage] = await Promise.all([
    page.waitForEvent('popup'),
    page
      .locator('div[role="document"] button:has-text("Too Good to Go")')
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
