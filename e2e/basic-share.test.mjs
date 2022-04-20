import { expect, test } from '@playwright/test'

test.skip('Basic share', async ({ baseURL, page }) => {
  await page.goto(baseURL)

  await page.locator('data-testid=cookie-consent-accept-all-btn').click()

  // Open invite drawer and get the invite link
  await page.locator('data-testid=challenge-status-invite-btn').click()
  const inviteLink = await page.inputValue('data-testid=share-shortlink-input')

  // Navigate to inviteLink and expect page to be loaded
  await page.goto(inviteLink)
  await page.waitForLoadState('networkidle')
  expect(page.locator('data-testid=hero-take-action-btn')).toBeVisible()
})
