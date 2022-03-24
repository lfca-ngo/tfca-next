import { Form, Radio } from 'antd'
import React from 'react'

import { GroupWrapper } from '../GroupWrapper'
import { DesiredDeliveryInput } from './DesiredDeliveryInput'
import { MeterInput } from './MeterInput'
import { PreviousProviderInput } from './PreviousProviderInput'

export const SwitchData = ({ requirePreviousContractCustomerId }) => {
  return (
    <GroupWrapper
      description="Wenn du in den letzten 6 Wochen umgezogen bist oder in Kürze umziehen wirst, dann wähle die Umzugsoption."
      label="Anschlussdaten"
    >
      <Form.Item
        label="Anlass für deinen Wechsel"
        name="type"
        rules={[{ message: 'Bitte auswählen!', required: true }]}
      >
        <Radio.Group>
          <Radio value="switch">Anbieterwechsel</Radio>
          <Radio value="relocation">Umzug</Radio>
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
                requirePreviousContractCustomerId={
                  requirePreviousContractCustomerId
                }
              />
            </>
          ) : null
        }
      </Form.Item>

      <MeterInput />

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
            <DesiredDeliveryInput />
          )
        }
      </Form.Item>
    </GroupWrapper>
  )
}
