import { Form, Input, Select } from 'antd'
import moment from 'moment'
import React from 'react'

import { DateStringPicker } from '../DateStringPicker'

export const DesiredDeliveryInput = ({ disableDesiredDelivery }) => {
  return (
    <>
      <Form.Item
        noStyle
        shouldUpdate={(prevValues, currentValues) =>
          prevValues.type !== currentValues.type
        }
      >
        {({ getFieldValue }) =>
          getFieldValue('type') === 'switch' ? (
            disableDesiredDelivery ? (
              <Form.Item hidden={true} name={['desiredDelivery', 'mode']}>
                <Input value={'asap'} />
              </Form.Item>
            ) : (
              <>
                <Form.Item
                  label="Hast Du einen Wunsch-Wechsel-Termin?"
                  name={['desiredDelivery', 'mode']}
                  rules={[{ message: 'Bitte auswählen!', required: true }]}
                >
                  <Select>
                    <Select.Option value="asap">
                      Nächstmöglicher Termin
                    </Select.Option>
                    <Select.Option value="date">Termin auswählen</Select.Option>
                  </Select>
                </Form.Item>
                <Form.Item
                  noStyle
                  shouldUpdate={(prevValues, currentValues) =>
                    prevValues.desiredDelivery?.mode !==
                    currentValues.desiredDelivery?.mode
                  }
                >
                  {({ getFieldValue }) =>
                    getFieldValue(['desiredDelivery', 'mode']) === 'date' ? (
                      <Form.Item
                        name={['desiredDelivery', 'date']}
                        rules={[
                          {
                            message: 'Bitte wähle einen Wechseltermin!',
                            required: true,
                          },
                        ]}
                      >
                        <DateStringPicker
                          disabledDate={disabledDate}
                          placeholder="dd.mm.yyyy"
                        />
                      </Form.Item>
                    ) : null
                  }
                </Form.Item>
              </>
            )
          ) : (
            <Form.Item
              label="Umzugsdatum"
              name={['desiredDelivery', 'date']}
              rules={[
                {
                  message: 'Bitte gib deinen Umzugstermin an!',
                  required: true,
                },
              ]}
            >
              <DateStringPicker
                disabledDate={disabledDate}
                placeholder="Umzugsdatum"
              />
            </Form.Item>
          )
        }
      </Form.Item>
    </>
  )
}

function disabledDate(current) {
  // Can not select days before 125 years and after 18 years agao
  return current && current < moment()
}
