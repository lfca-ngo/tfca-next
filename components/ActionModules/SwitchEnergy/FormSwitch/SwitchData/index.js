import { Form, Radio } from 'antd'
import React from 'react'

import { textBlockToString } from '../../../../../utils'
import { GroupWrapper } from '../GroupWrapper'
import { DesiredDeliveryInput } from './DesiredDeliveryInput'
import { MeterInput } from './MeterInput'
import { PreviousProviderInput } from './PreviousProviderInput'

export const SwitchData = ({
  blocks,
  disableDesiredDelivery,
  requirePreviousContractCustomerId,
}) => {
  return (
    <GroupWrapper
      description={textBlockToString(blocks['switch.connect.description'])}
      label={textBlockToString(blocks['switch.connect.label'])}
    >
      <Form.Item
        label={textBlockToString(blocks['switch.connect.type.label'])}
        name="type"
        rules={[
          {
            message: textBlockToString(blocks['switch.connect.type.error']),
            required: true,
          },
        ]}
      >
        <Radio.Group>
          <Radio value="switch">
            {textBlockToString(blocks['switch.connect.type.option.switch'])}
          </Radio>
          <Radio value="relocation">
            {textBlockToString(blocks['switch.connect.type.option.relocation'])}
          </Radio>
        </Radio.Group>
      </Form.Item>

      <Form.Item
        noStyle
        shouldUpdate={(prevValues, currentValues) =>
          prevValues.type !== currentValues.type
        }
      >
        {({ getFieldValue }) =>
          getFieldValue('type') === 'switch' ? (
            <>
              <PreviousProviderInput
                blocks={blocks}
                requirePreviousContractCustomerId={
                  requirePreviousContractCustomerId
                }
              />
            </>
          ) : null
        }
      </Form.Item>

      <MeterInput blocks={blocks} />

      <Form.Item
        noStyle
        shouldUpdate={(prevValues, currentValues) =>
          prevValues.previousContract?.cancellation?.instructed !==
          currentValues.previousContract?.cancellation?.instructed
        }
      >
        {({ getFieldValue }) =>
          getFieldValue(['previousContract', 'cancellation', 'instructed']) ===
          true ? null : (
            <DesiredDeliveryInput
              blocks={blocks}
              disableDesiredDelivery={disableDesiredDelivery}
            />
          )
        }
      </Form.Item>
    </GroupWrapper>
  )
}
