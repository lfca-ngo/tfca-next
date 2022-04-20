import { expect, test } from '@playwright/test'

import { navigateToAction } from './utils/navigate-to-action.mjs'

const ACTION_ID = 'switch_energy'

test(`Action ${ACTION_ID}`, async ({ baseURL, page }) => {
  await page.goto(baseURL)
  await navigateToAction(page, ACTION_ID)

  // Quickly finish energy challenge
  await page
    .locator(`id=${ACTION_ID} >> data-testid=switch-energy-calculate-skip-btn`)
    .click()
  await page.fill(
    `id=${ACTION_ID} >> data-testid=switch-energy-form-check-provider-search-input >> input`,
    'Polar'
  )
  await page
    .locator('data-testid=switch-energy-form-check-priovider-option')
    .nth(0)
    .click()
  await page
    .locator(
      `id=${ACTION_ID} >> data-testid=switch-energy-form-check-complete-btn`
    )
    .click()

  // Expect to see success screen
  await expect(page.locator('data-testid=step-success')).toBeVisible()

  // Enter own name for sharing
  await page.fill(
    `id=${ACTION_ID} >> data-testid=success-own-name-input`,
    'Greta'
  )

  // Add 2 more inputs for friend names
  await page
    .locator(`id=${ACTION_ID} >> data-testid=success-add-name-input-btn`)
    .click()
  await page
    .locator(`id=${ACTION_ID} >> data-testid=success-add-name-input-btn`)
    .click()

  // Fill out all 3 friend names
  const friendNames = ['Tick', 'Trick', 'Track']
  for (let i = 0; i < friendNames.length; i++) {
    await page
      .locator(`id=${ACTION_ID} >> data-testid=success-friend-name-input`)
      .nth(i)
      .fill(friendNames[i])
  }

  // Open share drawer
  await page
    .locator(`id=${ACTION_ID} >> data-testid=success-share-submit-btn`)
    .click()

  const inviteLink = await page.inputValue('data-testid=share-shortlink-input')

  // Navigate to inviteLink and expect name to be visible
  await page.goto(inviteLink)
  await page.waitForLoadState('networkidle')
  const heroText = await page.locator('data-testid=hero-title').textContent()
  expect(heroText).toContain(friendNames[0])
})
