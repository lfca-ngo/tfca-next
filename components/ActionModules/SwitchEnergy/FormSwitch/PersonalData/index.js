import { InfoCircleOutlined } from '@ant-design/icons'
import { Button, Checkbox, Form, Input, Popover } from 'antd'
import moment from 'moment'
import React from 'react'

import { DateStringPicker } from '../DateStringPicker'
import { GroupWrapper } from '../GroupWrapper'
import { AddressInput } from './AddressInput'

export const PersonalData = ({
  requireBirthday = false,
  requirePhone = false,
  requireSalutation = false,
}) => {
  return (
    <GroupWrapper
      label={
        <div>
          Persönliche Daten{' '}
          <Popover
            content={
              <div>
                Wenn du weitere Fragen hast, schau doch mal in unsere{' '}
                <Button type="link">FAQs</Button>
              </div>
            }
          >
            <InfoCircleOutlined />
          </Popover>
        </div>
      }
    >
      <AddressInput
        cityAnZipDisabled={true}
        name="shippingAddress"
        requireSalutation={requireSalutation}
      />

      <Form.Item name="separateBillingAddress" valuePropName="checked">
        <Checkbox>Abweichende Rechnungsadresse</Checkbox>
      </Form.Item>

      <Form.Item
        noStyle
        shouldUpdate={(prevValues, currentValues) =>
          prevValues.separateBillingAddress !==
          currentValues.separateBillingAddress
        }
      >
        {({ getFieldValue }) =>
          getFieldValue('separateBillingAddress') ? (
            <AddressInput
              name="billingAddress"
              requireSalutation={requireSalutation}
            />
          ) : null
        }
      </Form.Item>

      <Form.Item
        label="Email"
        name={['contact', 'email']}
        rules={[
          { message: 'Gib deine Email an!', required: true },
          { message: 'Die eingegebene Email ist nicht gültig', type: 'email' },
        ]}
      >
        <Input placeholder="greta.thunberg@earth.io" size="large" />
      </Form.Item>

      {requirePhone && (
        <Form.Item
          label="Telefon"
          name={['contact', 'phone']}
          rules={[
            {
              message: 'Gib Telefonnummer an!',
              required: true,
            },
            {
              message: 'Die eingegebene Telefonnummer ist nicht gültig.',
              pattern: /^[+]?\d+$/g,
            },
          ]}
        >
          <Input placeholder="+49 123456789" size="large" />
        </Form.Item>
      )}

      {requireBirthday && (
        <Form.Item
          label="Geburtstag"
          name={['personal', 'birthday']}
          rules={[
            {
              message: 'Gib dein Geburtsdatum an!',
              required: true,
            },
            {
              validator(_, value) {
                const date = moment(value)
                if (
                  !date ||
                  (date < moment().subtract(18, 'years') &&
                    date > moment().subtract(125, 'years'))
                ) {
                  return Promise.resolve()
                }
                return Promise.reject(new Error('Ungültiges Datum.'))
              },
            },
          ]}
        >
          <DateStringPicker
            defaultPickerValue={moment().subtract(25, 'years')}
            disabledDate={disabledDate}
            placeholder="dd.mm.yyyy"
          />
        </Form.Item>
      )}
    </GroupWrapper>
  )
}

function disabledDate(current) {
  // Can not select days before 125 years and after 18 years agao
  return (
    (current && current < moment().subtract(125, 'years')) ||
    (current && current > moment().subtract(18, 'years'))
  )
}
