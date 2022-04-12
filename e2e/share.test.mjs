import { expect, test } from '@playwright/test'
import clipboard from 'clipboardy'

test('Action Politics', async ({ baseURL, page }) => {
  await page.goto(baseURL)

  await page.locator('button:has-text("Accept all")').click()

  // Click button:has-text("Invite")
  await page.locator('button:has-text("Invite")').click()
  // Click button:has-text("Copy")
  await page.locator('button:has-text("Copy")').click()

  const inviteLink = await clipboard.read()
  await page.goto(inviteLink)
})
