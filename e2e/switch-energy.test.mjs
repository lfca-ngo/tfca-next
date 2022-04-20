import { expect, test } from '@playwright/test'

import { navigateToAction } from './utils/navigate-to-action.mjs'

test.skip('Action Switch Energy', async ({ baseURL, page }) => {
  await page.goto(baseURL)
  await navigateToAction(page, 'Switch Energy')

  // Start switching provider
  await page.locator('button:has-text("No, not yet")').click()

  // Select houshold size
  await page.locator('span:has-text("1 Pers.")').nth(2).click()
  await page.locator('text=3 Pers.').click()

  // Enter zip
  await page.locator('[placeholder="\\31 2043"]').click()
  await page.locator('[placeholder="\\31 2043"]').fill('12557')

  // Search providers
  await page.locator('button:has-text("Finde passende Tarife")').click()

  // Check details
  await page
    .locator(
      'text=Tarif: Wirklich Ökostrom125.91 €Basis: 9.80 €kwH: 47.18c100 % Wasserkraft aus De >> button'
    )
    .first()
    .click()

  // Go to form
  await page.locator('button:has-text("Switch now")').click()

  // Fill out form
  await page.locator('[placeholder="Greta"]').click()
  await page.locator('[placeholder="Greta"]').fill('Greta')
  await page.locator('[placeholder="Thunberg"]').click()
  await page.locator('[placeholder="Thunberg"]').fill('Thunberg')
  await page.locator('[placeholder="Auf der Erde 2"]').click()
  await page.locator('[placeholder="Auf der Erde 2"]').fill('Auf der Erde 2')
  await page
    .locator(
      'text=Persönliche Daten VornameNachnameStraße und HausnummerAddresszusatzPostleitzahlS >> input[type="checkbox"]'
    )
    .first()
    .check()
  await page.locator('[placeholder="\\35 \\. Stock"]').click()
  await page.locator('[placeholder="\\35 \\. Stock"]').fill('5. Stock')
  await page.locator('#switch_provider_separateBillingAddress').check()
  await page.locator('#switch_provider_billingAddress_firstName').click()
  await page
    .locator('#switch_provider_billingAddress_firstName')
    .fill("Greta's Dad")
  await page.locator('#switch_provider_billingAddress_lastName').click()
  await page
    .locator('#switch_provider_billingAddress_lastName')
    .fill('Thunberg')
  await page.locator('#switch_provider_billingAddress_streetAddress').click()
  await page
    .locator('#switch_provider_billingAddress_streetAddress')
    .fill('Auf dem Mond 1')
  await page
    .locator(
      'text=Persönliche Daten VornameNachnameStraße und HausnummerAddresszusatzZusatzPostlei >> input[type="checkbox"]'
    )
    .nth(2)
    .check()
  await page.locator('#switch_provider_billingAddress_addition').click()
  await page
    .locator('#switch_provider_billingAddress_addition')
    .fill('3. Stock')
  await page.locator('#switch_provider_billingAddress_zipCode').click()
  await page.locator('#switch_provider_billingAddress_zipCode').fill('12039')
  await page.locator('#switch_provider_billingAddress_city').click()
  await page.locator('#switch_provider_billingAddress_city').fill('Paris')
  await page.locator('[placeholder="greta\\.thunberg\\@earth\\.io"]').click()
  await page
    .locator('[placeholder="greta\\.thunberg\\@earth\\.io"]')
    .fill('greta.thunberg@earth.com')
  await page
    .locator(
      'text=Vorheriger VersorgerWähle einen Versorger >> input[role="combobox"]'
    )
    .click()
  await page
    .locator(
      'text=Vorheriger VersorgerWähle einen Versorger >> input[role="combobox"]'
    )
    .fill('Vatten')
  await page.locator('text=Vattenfall Energy Solutions GmbH').click()
  await page.locator('[placeholder="\\39 128310"]').click()
  await page.locator('[placeholder="\\39 128310"]').fill('123456789')
  await page.locator('text=Nächstmöglicher Termin').click()
  await page.locator('text=Termin auswählen').click()
  await page.locator('[placeholder="dd\\.mm\\.yyyy"]').click()
  await page.locator('.ant-picker-header-super-next-btn').click()
  await page
    .locator('.ant-picker-cell.ant-picker-cell-start .ant-picker-cell-inner')
    .first()
    .click()
  await page.locator('[placeholder="DE68500105178297336485"]').click()
  await page
    .locator('[placeholder="DE68500105178297336485"]')
    .fill('DE02120300000000202051')
  await page.locator('[placeholder="LOYDCHGGZCH"]').click()
  await page.locator('[placeholder="LOYDCHGGZCH"]').fill('BYLADEM1001')
  await page.locator('[placeholder="GLS Bank"]').click()
  await page.locator('[placeholder="GLS Bank"]').fill('DKB')
  await page
    .locator(
      'text=ZahlungsdatenDu zahlst bequem per Lastschrift. Wir übermitteln deine Daten direk >> input[type="checkbox"]'
    )
    .check()
  await page
    .locator(
      'text=Ich bestätige, dass ich die AGB und die Widerrufsbelehrung der Polarstern GmbH g'
    )
    .click()
  await page
    .locator(
      'text=Ich habe die Datenschutzhinweise mit den Informationen zur Verarbeitung meiner p'
    )
    .click()
  await page
    .locator(
      'text=Desweiteren habe ich die AGB von Switch for Climate gUG gelesen und akzeptiere d'
    )
    .click()

  // Submit the order
  await page.locator('button:has-text("Testorder platzieren (BETA)")').click()

  // Expect to see success screen
  await expect(
    page.locator('text=High five! Now, nominate friends to triple your impact')
  ).toBeVisible()
})
