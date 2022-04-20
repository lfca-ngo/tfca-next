import { expect, test } from '@playwright/test'
import clipboard from 'clipboardy'

test('Basic share', async ({ baseURL, page }) => {
  await page.goto(baseURL)

  await page.locator('data-testid=cookie-consent-accept-all-btn').click()

  // Open invite drawer and copy link
  await page.locator('data-testid=challenge-status-invite-btn').click()
  await page.locator('data-testid=share-copy-btn').click()

  // Read link from clipboard, navigate to page and expect page to be loaded
  const inviteLink = await clipboard.read()
  await page.goto(inviteLink)
  await page.waitForLoadState('networkidle')
  expect(page.locator('data-testid=hero-take-action-btn')).toBeVisible()
})
