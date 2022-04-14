import { InfoCircleOutlined } from '@ant-design/icons'
import { Form, Input, Popover, Radio } from 'antd'
import React from 'react'

import { textBlockToString } from '../../../../../utils'
import { DateStringPicker } from '../DateStringPicker'
import { ProviderSearchInput } from './ProviderSearchInput'

export const PreviousProviderInput = ({
  blocks,
  requirePreviousContractCustomerId,
}) => {
  return (
    <>
      <Form.Item
        label={textBlockToString(blocks['switch.connect.prevprovider.label'])}
        name={['previousContract', 'provider']}
        rules={[
          {
            message: textBlockToString(
              blocks['switch.connect.prevprovider.error']
            ),
            required: true,
          },
        ]}
      >
        <ProviderSearchInput blocks={blocks} />
      </Form.Item>

      {requirePreviousContractCustomerId && (
        <Form.Item
          label={
            <div>
              {textBlockToString(
                blocks['switch.connect.prevprovider.customerid.label.text1']
              )}{' '}
              <Popover
                content={
                  <div>
                    {textBlockToString(
                      blocks[
                        'switch.connect.prevprovider.customerid.label.text2'
                      ]
                    )}
                  </div>
                }
              >
                <InfoCircleOutlined />
              </Popover>
            </div>
          }
          name={['previousContract', 'customerId']}
          rules={[
            {
              message: textBlockToString(
                blocks['switch.connect.prevprovider.customerid.error']
              ),
              required: true,
            },
          ]}
        >
          <Input
            placeholder={textBlockToString(
              blocks['switch.connect.prevprovider.customerid.placeholder']
            )}
            size="large"
          />
        </Form.Item>
      )}

      <Form.Item
        label={textBlockToString(
          blocks['switch.connect.prevprovider.cancellation.label']
        )}
        name={['previousContract', 'cancellation', 'instructed']}
        rules={[
          {
            message: textBlockToString(
              blocks['switch.connect.prevprovider.cancellation.error']
            ),
            required: true,
          },
        ]}
      >
        <Radio.Group>
          <Radio value={true}>
            {textBlockToString(
              blocks['switch.connect.prevprovider.cancellation.option.yes']
            )}
          </Radio>
          <Radio value={false}>
            {textBlockToString(
              blocks['switch.connect.prevprovider.cancellation.option.no']
            )}
          </Radio>
        </Radio.Group>
      </Form.Item>

      <Form.Item
        noStyle
        shouldUpdate={(prevValues, currentValues) =>
          prevValues.previousContract?.cancellation?.instructed !==
          currentValues.previousContract?.cancellation?.instructed
        }
      >
        {({ getFieldValue }) =>
          getFieldValue(['previousContract', 'cancellation', 'instructed']) ===
          true ? (
            <Form.Item
              label={textBlockToString(
                blocks['switch.connect.prevprovider.cancellation.date.label']
              )}
              name={['previousContract', 'cancellation', 'date']}
              rules={[
                {
                  message: textBlockToString(
                    blocks[
                      'switch.connect.prevprovider.cancellation.date.error'
                    ]
                  ),
                  required: true,
                },
              ]}
            >
              <DateStringPicker
                placeholder={textBlockToString(
                  blocks[
                    'switch.connect.prevprovider.cancellation.date.placeholder'
                  ]
                )}
              />
            </Form.Item>
          ) : (
            <p>
              {textBlockToString(
                blocks['switch.connect.prevprovider.cancellation.hint']
              )}
            </p>
          )
        }
      </Form.Item>
    </>
  )
}
