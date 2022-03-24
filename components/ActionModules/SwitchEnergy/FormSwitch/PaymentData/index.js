import { Checkbox, Form, Input } from 'antd'
import { isValidBIC, isValidIBAN } from 'ibantools'
import React from 'react'

import { GroupWrapper } from '../GroupWrapper'

const onlyAllowBankChars = (e) => {
  const allowedCharacterRegex = new RegExp('[A-Z0-9_.-]')
  const pressedKey = String.fromCharCode(!e.charCode ? e.which : e.charCode)
  if (!allowedCharacterRegex.test(pressedKey)) {
    e.preventDefault()
    return false
  }
}

export const PaymentData = () => {
  return (
    <GroupWrapper
      description="Du zahlst bequem per Lastschrift. Wir übermitteln deine Daten direkt an den Provider."
      label="Zahlungsdaten"
    >
      <Form.Item
        label="IBAN"
        name={['payment', 'accountDetails', 'iban']}
        required
        rules={[
          {
            validator(_, value) {
              if (!value || isValidIBAN(value)) {
                return Promise.resolve()
              }
              return Promise.reject(new Error('Bitte überprüfe Deine IBAN.'))
            },
          },
        ]}
      >
        <Input onKeyPress={onlyAllowBankChars} size="large" />
      </Form.Item>

      <Form.Item
        label="BIC"
        name={['payment', 'accountDetails', 'bic']}
        required
        rules={[
          {
            validator(_, value) {
              if (!value || isValidBIC(value)) {
                return Promise.resolve()
              }
              return Promise.reject(new Error('Bitte überprüfe Deine BIC.'))
            },
          },
        ]}
      >
        <Input onKeyPress={onlyAllowBankChars} size="large" />
      </Form.Item>

      <Form.Item
        label="Name der Bank"
        name={['payment', 'accountDetails', 'bankName']}
        rules={[
          { message: '„Name der Bank“ muss angegeben werden.', required: true },
        ]}
      >
        <Input size="large" />
      </Form.Item>

      <Form.Item
        label="Ich ermächtige Fair Trade Power Deutschland GmbH, Zahlungen von meinem
        Konto mittels Lastschrift einzuziehen. Zugleich weise
        ich mein Kreditinstitut an, diese Lastschriften
        einzulösen."
        name={['payment', 'accountDetails', 'authorization']}
        required
        rules={[
          {
            message: '',
            required: true,
          },
          {
            validator(_, value) {
              if (value === true) {
                return Promise.resolve()
              }
              return Promise.reject(
                new Error(
                  'Bitte gib Dein Einverständnis für den Einzug per Lastschrift.'
                )
              )
            },
          },
        ]}
        valuePropName="checked"
      >
        <Checkbox />
      </Form.Item>
    </GroupWrapper>
  )
}
