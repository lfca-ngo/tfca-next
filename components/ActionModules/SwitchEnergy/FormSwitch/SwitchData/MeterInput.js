import { InfoCircleOutlined } from '@ant-design/icons'
import { Form, Input, Popover, Select } from 'antd'
import React from 'react'

import { textBlockToString } from '../../../../../utils'

export const MeterInput = ({ blocks }) => {
  return (
    <>
      <Form.Item
        label={textBlockToString(blocks['switch.connect.meter.type.label'])}
        name={['meter', 'mid', 'type']}
        rules={[
          {
            message: textBlockToString(
              blocks['switch.connect.meter.type.error']
            ),
            required: true,
          },
        ]}
      >
        <Select>
          <Select.Option value="number">
            {textBlockToString(
              blocks['switch.connect.meter.type.option.number']
            )}
          </Select.Option>
          <Select.Option value="maLoId">
            {textBlockToString(
              blocks['switch.connect.meter.type.option.maloid']
            )}
          </Select.Option>
        </Select>
      </Form.Item>

      <Form.Item
        noStyle
        shouldUpdate={(prevValues, currentValues) =>
          prevValues.meter?.mid?.type !== currentValues.meter?.mid?.type
        }
      >
        {({ getFieldValue }) =>
          getFieldValue(['meter', 'mid', 'type']) === 'number' ? (
            <Form.Item
              label={
                <div>
                  {textBlockToString(
                    blocks['switch.connect.meter.number.label.text1']
                  )}{' '}
                  <Popover
                    content={
                      <div>
                        {textBlockToString(
                          blocks['switch.connect.meter.number.label.text2']
                        )}
                      </div>
                    }
                  >
                    <InfoCircleOutlined />
                  </Popover>
                </div>
              }
              name={['meter', 'mid', 'number']}
              rules={[
                {
                  message: textBlockToString(
                    blocks['switch.connect.meter.number.error']
                  ),
                  required: true,
                },
              ]}
            >
              <Input
                placeholder={textBlockToString(
                  blocks['switch.connect.meter.number.placeholder']
                )}
                size="large"
              />
            </Form.Item>
          ) : (
            <Form.Item
              label={
                <div>
                  {textBlockToString(
                    blocks['switch.connect.meter.maloid.label.text1']
                  )}{' '}
                  <Popover
                    content={
                      <div>
                        {textBlockToString(
                          blocks['switch.connect.meter.maloid.label.text2']
                        )}
                      </div>
                    }
                  >
                    <InfoCircleOutlined />
                  </Popover>
                </div>
              }
              name={['meter', 'mid', 'maLoId']}
              rules={[
                {
                  message: textBlockToString(
                    blocks['switch.connect.meter.maloid.error']
                  ),
                  required: true,
                },
                {
                  message: textBlockToString(
                    blocks['switch.connect.meter.maloid.error.invalid']
                  ),
                  pattern: /^\d{11}$/,
                },
              ]}
            >
              <Input
                inputMode="numeric"
                pattern="[0-9]*"
                placeholder={textBlockToString(
                  blocks['switch.connect.meter.maloid.placeholder']
                )}
                size="large"
                type="number"
              />
            </Form.Item>
          )
        }
      </Form.Item>
    </>
  )
}
