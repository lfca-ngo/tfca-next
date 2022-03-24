import { InfoCircleOutlined } from '@ant-design/icons'
import { Form, Input, Popover, Radio } from 'antd'
import React from 'react'

import { DateStringPicker } from '../DateStringPicker'
import { ProviderSearchInput } from './ProviderSearchInput'

export const PreviousProviderInput = ({
  requirePreviousContractCustomerId,
}) => {
  return (
    <>
      <Form.Item
        label="Vorheriger Versorger"
        name={['previousContract', 'provider']}
        rules={[
          { message: 'Bitte wähle einen Versorger aus!', required: true },
        ]}
      >
        <ProviderSearchInput />
      </Form.Item>

      {requirePreviousContractCustomerId && (
        <Form.Item
          label={
            <div>
              Kundennummer{' '}
              <Popover
                content={
                  <div>
                    Deine Kundennummer findest Du auf Deiner letzten
                    Stromrechnung.
                  </div>
                }
              >
                <InfoCircleOutlined />
              </Popover>
            </div>
          }
          name={['previousContract', 'customerId']}
          rules={[
            { message: 'Bitte gib deine Kundennummer an!', required: true },
          ]}
        >
          <Input placeholder="012345678" size="large" />
        </Form.Item>
      )}

      <Form.Item
        label="Hast Du Deinen Vertrag bereits gekündigt?"
        name={['previousContract', 'cancellation', 'instructed']}
        rules={[{ message: 'Bitte auswählen!', required: true }]}
      >
        <Radio.Group>
          <Radio value={true}>Ja</Radio>
          <Radio value={false}>Nein</Radio>
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
              label="Kündigungsdatum"
              name={['previousContract', 'cancellation', 'date']}
              rules={[
                {
                  message: 'Bitte gib deinen Kündigungsdatum an!',
                  required: true,
                },
              ]}
            >
              <DateStringPicker placeholder="dd.mm.yyyy" />
            </Form.Item>
          ) : (
            <p>
              Kein Problem, wir kündigen den Vertrag bei Deinem alten
              Energieversorger.
            </p>
          )
        }
      </Form.Item>
    </>
  )
}
