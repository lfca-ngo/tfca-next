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
                  label={textBlockToString(
                    blocks['switch.connect.desireddelivery.label']
                  )}
                  name={['desiredDelivery', 'mode']}
                  rules={[
                    {
                      message: textBlockToString(
                        blocks['switch.connect.desireddelivery.error']
                      ),
                      required: true,
                    },
                  ]}
                >
                  <Select>
                    <Select.Option value="asap">
                      {textBlockToString(
                        blocks['switch.connect.desireddelivery.option.asap']
                      )}
                    </Select.Option>
                    <Select.Option value="date">
                      {textBlockToString(
                        blocks['switch.connect.desireddelivery.option.date']
                      )}
                    </Select.Option>
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
                            message: textBlockToString(
                              blocks['switch.connect.desireddelivery.error']
                            ),
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
              label={textBlockToString(
                blocks['switch.connect.desireddelivery.move.label']
              )}
              name={['desiredDelivery', 'date']}
              rules={[
                {
                  message: textBlockToString(
                    blocks['switch.connect.desireddelivery.move.error']
                  ),
                  required: true,
                },
              ]}
            >
              <DateStringPicker
                disabledDate={disabledDate}
                placeholder={textBlockToString(
                  blocks['switch.connect.desireddelivery.move.placeholder']
                )}
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
