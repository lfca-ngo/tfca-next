import { Col, Form, Input, Radio, Row, Switch } from 'antd'
import React, { useState } from 'react'

export const AddressInput = ({
  cityAnZipDisabled = false,
  name,
  requireSalutation = false,
}) => {
  const [hasAddition, setHasAddition] = useState(false)

  return (
    <>
      {requireSalutation && (
        <Form.Item
          label="Anrede"
          name={[name, 'salutation']}
          rules={[{ message: 'Bitte wähle eine Option!', required: true }]}
        >
          <Radio.Group>
            <Radio value="ms">Frau</Radio>
            <Radio value="mr">Herr</Radio>
            <Radio value="neutral">Divers</Radio>
          </Radio.Group>
        </Form.Item>
      )}

      <Row gutter={16}>
        <Col xs={12}>
          <Form.Item
            label="Vorname"
            name={[name, 'firstName']}
            rules={[
              { message: 'Bitte gib deinen Vornamen an!', required: true },
            ]}
          >
            <Input placeholder="Greta" size="large" />
          </Form.Item>
        </Col>
        <Col xs={12}>
          <Form.Item
            label="Nachname"
            name={[name, 'lastName']}
            rules={[
              { message: 'Bitte gib deinen Nachnamen an!', required: true },
            ]}
          >
            <Input placeholder="Thunberg" size="large" />
          </Form.Item>
        </Col>
      </Row>

      <Form.Item
        label="Straße und Hausnummer"
        name={[name, 'streetAddress']}
        rules={[
          {
            message: 'Bitte gib deine Adresse an!',
            required: true,
          },
          {
            message: 'Die Adresse ist ungültig.',
            pattern: /^(.+) ([\d .-]+.*)$/,
          },
        ]}
      >
        <Input placeholder="Auf der Erde 2" size="large" />
      </Form.Item>

      {/* Do NOT add a `name` prop since we want to keep this value out of the form */}
      <Form.Item label="Zusatz">
        <Switch onChange={(checked) => setHasAddition(checked)} />
      </Form.Item>

      {hasAddition && (
        <Form.Item label="Zusatz" name={[name, 'addition']}>
          <Input placeholder="5. Stock" size="large" />
        </Form.Item>
      )}

      <Row gutter={16}>
        <Col xs={12}>
          <Form.Item
            label="Postleitzahl"
            name={[name, 'zipCode']}
            rules={[
              {
                message: 'Wie lautet deine Postleitzahl?',
                required: true,
              },
              {
                message: 'Die eingegebene Postleitzahl ist nicht gültig.',
                pattern: /^\d{5}$/,
              },
            ]}
          >
            <Input
              disabled={cityAnZipDisabled}
              placeholder="12099"
              size="large"
              type="number"
            />
          </Form.Item>
        </Col>
        <Col xs={12}>
          <Form.Item
            label="Stadt"
            name={[name, 'city']}
            rules={[{ message: 'Bitte gib deine Stadt an!', required: true }]}
          >
            <Input
              disabled={cityAnZipDisabled}
              placeholder="Paris"
              size="large"
            />
          </Form.Item>
        </Col>
      </Row>
    </>
  )
}
