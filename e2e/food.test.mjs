import { test } from '@playwright/test'

import { leavePageAndCount } from './utils/leave-page-and-count.mjs'
import { navigateToAction } from './utils/navigate-to-action.mjs'

const ACTION_ID = 'food'

test(`Action ${ACTION_ID}`, async ({ baseURL, page }) => {
  await page.goto(baseURL)
  await navigateToAction(page, ACTION_ID)

  // Take quiz
  await page.locator('data-testid=quiz-intro-start-btn').click()

  // Answer 7 questions
  for (let i = 0; i < 7; i++) {
    await page
      .locator(`id=${ACTION_ID} >> data-testid=radio-checkbox`)
      .nth(0)
      .click()
    await page.locator('data-testid=quiz-question-submit-btn').click()
    await page.locator('data-testid=quiz-answer-next-btn').click()
  }

  // Open details and navigate to external page
  await page.locator('data-testid=quiz-results-cta-btn').nth(0).click()
  await leavePageAndCount(page)
})
