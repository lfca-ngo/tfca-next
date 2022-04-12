export const navigateToAction = async (page, actionName) => {
  // Accept cookies
  await page.locator('button:has-text("Accept all")').click()

  await page.locator('button:has-text("Take action")').click()
  await page.locator(`button:has-text("${actionName}")`).click()
}
