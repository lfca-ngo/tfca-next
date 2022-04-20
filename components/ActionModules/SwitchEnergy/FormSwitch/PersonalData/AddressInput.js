import { Checkbox, Col, Form, Input, Radio, Row } from 'antd'
import React, { useState } from 'react'

import { textBlockToString } from '../../../../../utils'

export const AddressInput = ({
  blocks,
  cityAnZipDisabled = false,
  name,
  requireSalutation = false,
}) => {
  const [hasAddition, setHasAddition] = useState(false)

  return (
    <>
      {requireSalutation && (
        <Form.Item
          label={textBlockToString(blocks['switch.personal.salutation.label'])}
          name={[name, 'salutation']}
          rules={[
            {
              message: textBlockToString(
                blocks['switch.personal.salutation.error']
              ),
              required: true,
            },
          ]}
        >
          <Radio.Group>
            <Radio value="ms">
              {textBlockToString(
                blocks['switch.personal.salutation.option.ms']
              )}
            </Radio>
            <Radio value="mr">
              {textBlockToString(
                blocks['switch.personal.salutation.option.mr']
              )}
            </Radio>
            <Radio value="neutral">
              {textBlockToString(
                blocks['switch.personal.salutation.option.neutral']
              )}
            </Radio>
          </Radio.Group>
        </Form.Item>
      )}

      <Row gutter={16}>
        <Col xs={12}>
          <Form.Item
            label={textBlockToString(blocks['switch.personal.firstname.label'])}
            name={[name, 'firstName']}
            rules={[
              {
                message: textBlockToString(
                  blocks['switch.personal.firstname.error']
                ),
                required: true,
              },
            ]}
          >
            <Input
              data-testid="switch-energy-form-switch-firstname-input"
              placeholder={textBlockToString(
                blocks['switch.personal.firstname.placeholder']
              )}
              size="large"
            />
          </Form.Item>
        </Col>
        <Col xs={12}>
          <Form.Item
            label={textBlockToString(blocks['switch.personal.lastname.label'])}
            name={[name, 'lastName']}
            rules={[
              {
                message: textBlockToString(
                  blocks['switch.personal.lastname.error']
                ),
                required: true,
              },
            ]}
          >
            <Input
              data-testid="switch-energy-form-switch-lastname-input"
              placeholder={textBlockToString(
                blocks['switch.personal.lastname.placeholder']
              )}
              size="large"
            />
          </Form.Item>
        </Col>
      </Row>

      <Form.Item
        label={textBlockToString(blocks['switch.personal.street.label'])}
        name={[name, 'streetAddress']}
        rules={[
          {
            message: textBlockToString(blocks['switch.personal.street.error']),
            required: true,
          },
          {
            message: textBlockToString(
              blocks['switch.personal.street.error.invalid']
            ),
            pattern: /^(.+) ([\d .-]+.*)$/,
          },
        ]}
      >
        <Input
          data-testid="switch-energy-form-switch-street-input"
          placeholder={textBlockToString(
            blocks['switch.personal.street.placeholder']
          )}
          size="large"
        />
      </Form.Item>

      {/* Do NOT add a `name` prop since we want to keep this value out of the form */}
      <Form.Item>
        <Checkbox onChange={(e) => setHasAddition(e.target.checked)}>
          Addresszusatz
        </Checkbox>
      </Form.Item>

      {hasAddition && (
        <Form.Item
          label={textBlockToString(
            blocks['switch.personal.address.additional.label']
          )}
          name={[name, 'addition']}
        >
          <Input
            placeholder={textBlockToString(
              blocks['switch.personal.addition.placeholder']
            )}
            size="large"
          />
        </Form.Item>
      )}

      <Row gutter={16}>
        <Col xs={12}>
          <Form.Item
            label={textBlockToString(blocks['switch.personal.zipcode.label'])}
            name={[name, 'zipCode']}
            rules={[
              {
                message: textBlockToString(
                  blocks['switch.personal.zipcode.error']
                ),
                required: true,
              },
              {
                message: textBlockToString(
                  blocks['switch.personal.zipcode.error.invalid']
                ),
                pattern: /^\d{5}$/,
              },
            ]}
          >
            <Input
              disabled={cityAnZipDisabled}
              placeholder={textBlockToString(
                blocks['switch.personal.zipcode.placeholder']
              )}
              size="large"
              type="number"
            />
          </Form.Item>
        </Col>
        <Col xs={12}>
          <Form.Item
            label={textBlockToString(blocks['switch.personal.city.label'])}
            name={[name, 'city']}
            rules={[
              {
                message: textBlockToString(
                  blocks['switch.personal.city.error']
                ),
                required: true,
              },
            ]}
          >
            <Input
              disabled={cityAnZipDisabled}
              placeholder={textBlockToString(
                blocks['switch.personal.city.placeholder']
              )}
              size="large"
            />
          </Form.Item>
        </Col>
      </Row>
    </>
  )
}
