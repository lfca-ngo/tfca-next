const { expect, test } = require('@playwright/test')

test('test', async ({ baseUrl, page }) => {
  await page.goto(baseUrl)
  // Click button:has-text("Accept all")
  await page.locator('button:has-text("Accept all")').click()
  // Click button:has-text("Take action")
  await page.locator('button:has-text("Take action")').click()
  // Click button:has-text("Switch Energy")
  await page.locator('button:has-text("Switch Energy")').click()
  // Click text=Yes, I do
  await page.locator('text=Yes, I do').click()
  // Click text=Go backGreat! Check if your provider is really greenNot all tariffs that sell re >> input[role="combobox"]
  await page
    .locator(
      'text=Go backGreat! Check if your provider is really greenNot all tariffs that sell re >> input[role="combobox"]'
    )
    .click()
  // Fill text=Go backGreat! Check if your provider is really greenNot all tariffs that sell re >> input[role="combobox"]
  await page
    .locator(
      'text=Go backGreat! Check if your provider is really greenNot all tariffs that sell re >> input[role="combobox"]'
    )
    .fill('Pola')
  // Click text=Polarstern GmbH >> nth=1
  await page.locator('text=Polarstern GmbH').nth(1).click()
  // Click button:has-text("Challenge abschließen")
  await page.locator('button:has-text("Challenge abschließen")').click()
  // Click [placeholder="Name"]
  await page.locator('[placeholder="Name"]').click()
  // Fill [placeholder="Name"]
  await page.locator('[placeholder="Name"]').fill('Timo')
  // Click button:has-text("Open invite dialog")
  await page.locator('button:has-text("Open invite dialog")').click()
  // Click button:has-text("Copy")
  await page.locator('button:has-text("Copy")').click()
})
