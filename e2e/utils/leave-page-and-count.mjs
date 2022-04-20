import { expect } from '@playwright/test'

export const leavePageAndCount = async (page) => {
  const [externalPage] = await Promise.all([
    page.waitForEvent('popup'),
    page.locator('data-testid=leave-page-link-btn').click(),
  ])

  await externalPage.waitForLoadState()

  // Make the action count
  page.bringToFront()
  await page.locator('data-testid=leave-page-count-btn').click()

  // Expect to see success screen
  await expect(page.locator('data-testid=step-success')).toBeVisible()
}
