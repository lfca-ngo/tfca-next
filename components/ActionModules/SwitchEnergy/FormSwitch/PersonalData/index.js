import { Checkbox, Form, Input } from 'antd'
import moment from 'moment'
import React from 'react'

import { textBlockToString } from '../../../../../utils'
import { DateStringPicker } from '../DateStringPicker'
import { GroupWrapper } from '../GroupWrapper'
import { AddressInput } from './AddressInput'

export const PersonalData = ({
  blocks,
  requireBirthday = false,
  requirePhone = false,
  requireSalutation = false,
}) => {
  return (
    <GroupWrapper label={textBlockToString(blocks['switch.personal.label'])}>
      <AddressInput
        blocks={blocks}
        cityAnZipDisabled={true}
        name="shippingAddress"
        requireSalutation={requireSalutation}
      />

      <Form.Item name="separateBillingAddress" valuePropName="checked">
        <Checkbox>
          {textBlockToString(blocks['switch.personal.separatebilling.label'])}
        </Checkbox>
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
        label={textBlockToString(blocks['switch.personal.email.label'])}
        name={['contact', 'email']}
        rules={[
          {
            message: textBlockToString(blocks['switch.personal.email.error']),
            required: true,
          },
          {
            message: textBlockToString(
              blocks['switch.personal.email.error.invalid']
            ),
            type: 'email',
          },
        ]}
      >
        <Input
          placeholder={textBlockToString(
            blocks['switch.personal.email.placeholder']
          )}
          size="large"
        />
      </Form.Item>

      {requirePhone && (
        <Form.Item
          label={textBlockToString(blocks['switch.personal.phone.label'])}
          name={['contact', 'phone']}
          rules={[
            {
              message: textBlockToString(blocks['switch.personal.phone.error']),
              required: true,
            },
            {
              message: textBlockToString(
                blocks['switch.personal.phone.error.invalid']
              ),
              pattern: /^[+]?\d+$/g,
            },
          ]}
        >
          <Input
            placeholder={textBlockToString(
              blocks['switch.personal.phone.placeholder']
            )}
            size="large"
          />
        </Form.Item>
      )}

      {requireBirthday && (
        <Form.Item
          label={textBlockToString(blocks['switch.personal.birthday.label'])}
          name={['personal', 'birthday']}
          rules={[
            {
              message: textBlockToString(
                blocks['switch.personal.birthday.error']
              ),
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
                return Promise.reject(
                  new Error(
                    textBlockToString(
                      blocks['switch.personal.birthday.error.invalid']
                    )
                  )
                )
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
