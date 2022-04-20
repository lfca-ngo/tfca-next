import { expect, test } from '@playwright/test'

import { navigateToAction } from './utils/navigate-to-action.mjs'

const ACTION_ID = 'switch_energy'

test(`Action ${ACTION_ID}`, async ({ baseURL, page }) => {
  await page.goto(baseURL)
  await navigateToAction(page, ACTION_ID)

  // Start switching provider
  await page
    .locator(`id=${ACTION_ID} >> data-testid=switch-energy-intro-start-btn`)
    .click()

  // Select houshold size and enter zip
  await page.locator(`id=${ACTION_ID} >> data-testid=select`).click()
  await page.locator('data-testid=select-item-2300').click()
  await page.fill(
    `id=${ACTION_ID} >> data-testid=switch-energy-select-postcode-energy-input`,
    '12557'
  )
  await page
    .locator(`id=${ACTION_ID} >> data-testid=switch-energy-calculate-next-btn`)
    .click()

  // Open provider details for Polarstern (which requires the least data ion the form)
  await page
    .locator(
      `id=${ACTION_ID} >> data-testid=provider-card-5f296bbcefbdff0011567429 >> data-testid=provider-card-details-btn`
    )
    .click()

  // Start switch
  await page.locator('data-testid=provider-details-cta-btn').nth(0).click()

  // Fill out form
  await page.fill(
    `id=${ACTION_ID} >> data-testid=switch-energy-form-switch-firstname-input`,
    'Greta'
  )
  await page.fill(
    `id=${ACTION_ID} >> data-testid=switch-energy-form-switch-lastname-input`,
    'Thunberg'
  )
  await page.fill(
    `id=${ACTION_ID} >> data-testid=switch-energy-form-switch-street-input`,
    'Auf der Erde 2'
  )
  await page.fill(
    `id=${ACTION_ID} >> data-testid=switch-energy-form-switch-email-input`,
    'greta.thunberg@earth.com'
  )
  await page.fill(
    `id=${ACTION_ID} >> data-testid=switch-energy-form-switch-previous-priovider-search-input >> input`,
    'Vattenfall'
  )

  await page
    .locator('data-testid=switch-energy-form-switch-previous-priovider-option')
    .nth(0)
    .click()
  await page.fill(
    `id=${ACTION_ID} >> data-testid=switch-energy-form-switch-meter-input`,
    '123456789'
  )
  await page.fill(
    `id=${ACTION_ID} >> data-testid=switch-energy-form-switch-iban-input`,
    'DE68500105178297336485'
  )
  await page.fill(
    `id=${ACTION_ID} >> data-testid=switch-energy-form-switch-bic-input`,
    'BYLADEM1001'
  )
  await page.fill(
    `id=${ACTION_ID} >> data-testid=switch-energy-form-switch-bankname-input`,
    'DKB'
  )
  await page
    .locator(
      `id=${ACTION_ID} >> data-testid=switch-energy-form-switch-payment-checkbox`
    )
    .check()

  await page
    .locator(
      `id=${ACTION_ID} >> data-testid=switch-energy-form-switch-provider-terms-checkbox`
    )
    .check()

  await page
    .locator(
      `id=${ACTION_ID} >> data-testid=switch-energy-form-switch-privacy-checkbox`
    )
    .check()

  await page
    .locator(
      `id=${ACTION_ID} >> data-testid=switch-energy-form-switch-own-terms-checkbox`
    )
    .check()

  // Submit the order
  await page
    .locator(`id=${ACTION_ID} >> data-testid=switch-energy-form-submit-btn`)
    .click()

  // Expect to see success screen
  await expect(page.locator('data-testid=step-success')).toBeVisible()
})
