import { InfoCircleOutlined } from '@ant-design/icons'
import { Form, Input, Popover, Select } from 'antd'
import React from 'react'

export const MeterInput = ({ blocks }) => {
  return (
    <>
      <Form.Item
        label="Zur Ermittlung Deines Stromzählers benötigen wir eine Angabe"
        name={['meter', 'mid', 'type']}
        rules={[{ message: 'Bitte auswählen!', required: true }]}
      >
        <Select>
          <Select.Option value="number">Zählernummer</Select.Option>
          <Select.Option value="maLoId">Marktlokations-ID</Select.Option>
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
                  Zählernummer{' '}
                  <Popover
                    content={
                      <div>
                        Deine Zählernummer findest Du auf Deiner letzten
                        Stromrechnung.
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
                  message: 'Bitte gebe deine Zählernummer ein!',
                  required: true,
                },
              ]}
            >
              <Input placeholder="9128310" size="large" />
            </Form.Item>
          ) : (
            <Form.Item
              label={
                <div>
                  Marktlokations-ID{' '}
                  <Popover
                    content={
                      <div>
                        Deine Marktlokations-ID oder -Nummer findest Du auf
                        Deiner letzten Stromrechnung.
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
                  message: 'Bitte gebe deine Marktlokations-ID ein!',
                  required: true,
                },
                {
                  message:
                    'Diese Marktlokations-ID scheint nicht korrekt zu sein.',
                  pattern: /^\d{11}$/,
                },
              ]}
            >
              <Input
                inputMode="numeric"
                pattern="[0-9]*"
                placeholder="9128310"
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
