import { Checkbox, Form, Input } from 'antd'
import { isValidBIC, isValidIBAN } from 'ibantools'
import React from 'react'

import { textBlockToString } from '../../../../../utils'
import { GroupWrapper } from '../GroupWrapper'

const onlyAllowBankChars = (e) => {
  const allowedCharacterRegex = new RegExp('[A-Z0-9_.-]')
  const pressedKey = String.fromCharCode(!e.charCode ? e.which : e.charCode)
  if (!allowedCharacterRegex.test(pressedKey)) {
    e.preventDefault()
    return false
  }
}

export const PaymentData = ({ blocks, providerLegalName }) => {
  return (
    <GroupWrapper
      description={textBlockToString(blocks['switch.payment.description'])}
      label={textBlockToString(blocks['switch.payment.label'])}
    >
      <Form.Item
        label={textBlockToString(blocks['switch.payment.iban.label'])}
        name={['payment', 'accountDetails', 'iban']}
        required
        rules={[
          {
            validator(_, value) {
              if (!value || isValidIBAN(value)) {
                return Promise.resolve()
              }
              return Promise.reject(
                new Error(
                  textBlockToString(blocks['switch.payment.iban.error'])
                )
              )
            },
          },
        ]}
      >
        <Input
          data-testid="switch-energy-form-switch-iban-input"
          onKeyPress={onlyAllowBankChars}
          placeholder={textBlockToString(
            blocks['switch.payment.iban.placeholder']
          )}
          size="large"
        />
      </Form.Item>

      <Form.Item
        label={textBlockToString(blocks['switch.payment.bic.label'])}
        name={['payment', 'accountDetails', 'bic']}
        required
        rules={[
          {
            validator(_, value) {
              if (!value || isValidBIC(value)) {
                return Promise.resolve()
              }
              return Promise.reject(
                new Error(textBlockToString(blocks['switch.payment.bic.error']))
              )
            },
          },
        ]}
      >
        <Input
          data-testid="switch-energy-form-switch-bic-input"
          onKeyPress={onlyAllowBankChars}
          placeholder={textBlockToString(
            blocks['switch.payment.bic.placeholder']
          )}
          size="large"
        />
      </Form.Item>

      <Form.Item
        label={textBlockToString(blocks['switch.payment.bankname.label'])}
        name={['payment', 'accountDetails', 'bankName']}
        rules={[
          {
            message: textBlockToString(blocks['switch.payment.bankname.error']),
            required: true,
          },
        ]}
      >
        <Input
          data-testid="switch-energy-form-switch-bankname-input"
          placeholder={textBlockToString(
            blocks['switch.payment.bankname.placeholder']
          )}
          size="large"
        />
      </Form.Item>

      <Form.Item
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
                  textBlockToString(
                    blocks['switch.payment.authorization.error']
                  )
                )
              )
            },
          },
        ]}
        valuePropName="checked"
      >
        <Checkbox data-testid="switch-energy-form-switch-payment-checkbox">
          {textBlockToString(blocks['switch.payment.authorization.label'], {
            providerLegalName,
          })}
        </Checkbox>
      </Form.Item>
    </GroupWrapper>
  )
}
