export const navigateToAction = async (page, actionId) => {
  // Accept cookies
  await page.locator('data-testid=cookie-consent-accept-all-btn').click()

  await page.locator('data-testid=hero-take-action-btn').click()
  await page.locator(`data-testid=actions-nav-${actionId}-btn`).click()
}
