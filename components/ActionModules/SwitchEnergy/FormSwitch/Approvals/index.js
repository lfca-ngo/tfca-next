import { Checkbox, Form, Popover } from 'antd'
import React from 'react'

import { GroupWrapper } from '../GroupWrapper'

export const Approvals = ({
  cancellationLink,
  privacyLink,
  providerAddress,
  providerLegalName,
  termsLink,
}) => {
  return (
    <GroupWrapper label="Einverständnis und Bestätigung">
      <Form.Item
        label={
          <span>
            Ich bestätige, dass ich die{' '}
            <a href={termsLink} rel="noopener noreferrer" target="_blank">
              AGB
            </a>{' '}
            und die{' '}
            <a
              href={cancellationLink}
              rel="noopener noreferrer"
              target="_blank"
            >
              Widerrufsbelehrung
            </a>{' '}
            der {providerLegalName} gelesen habe und akzeptiere diese. Ich
            erteile die{' '}
            <Popover
              content={`Ich beauftrage die ${providerLegalName}, ${providerAddress}, mit der Lieferung von elektrischer Energie in Höhe meines Gesamtbedarfs für die unten bezeichnete Stromabnahmestelle. Ich beauftrage und bevollmächtige die Fair Trade Power Deutschland GmbH, sofern notwendig, meine gegenwärtig mit dem bisherigen Stromversorger bestehende Stromversorgung zu kündigen und, sofern notwendig, die erforderlichen Verträge mit dem örtlichen Netzbetreiber abzuschließen.`}
              title="Auftrag & Vollmacht"
              trigger="click"
            >
              <a>Vollmacht</a>
            </Popover>{' '}
            zur Verarbeitung meiner Bestellung.
          </span>
        }
        name={['approvals', 'providerTerms']}
        rules={[
          {
            message: '',
            required: true,
          },
          {
            validator(_, value) {
              if (value === true) {
                return Promise.resolve()
              }
              return Promise.reject(
                new Error('Bitte akzeptiere die Bedingungen des Versorgers.')
              )
            },
          },
        ]}
        valuePropName="checked"
      >
        <Checkbox />
      </Form.Item>

      <Form.Item
        label={
          <span>
            Ich habe die{' '}
            <a href={privacyLink} rel="noopener noreferrer" target="_blank">
              Datenschutzhinweise
            </a>{' '}
            mit den Informationen zur Verarbeitung meiner personenbezogenen
            Daten zur Kenntnis genommen.
          </span>
        }
        name={['approvals', 'privacyTerms']}
        rules={[
          {
            message: '',
            required: true,
          },
          {
            validator(_, value) {
              if (value === true) {
                return Promise.resolve()
              }
              return Promise.reject(
                new Error('Bitte akzeptiere die Bedingungen des Versorgers.')
              )
            },
          },
        ]}
        valuePropName="checked"
      >
        <Checkbox />
      </Form.Item>

      <Form.Item
        label={
          <span>
            Desweiteren habe ich die{' '}
            <a
              href="https://switch-for-climate.de/agb"
              rel="noopener noreferrer"
              target="_blank"
            >
              AGB
            </a>{' '}
            von <i>Switch for Climate gUG</i> gelesen und akzeptiere diese. Ich
            erteile die{' '}
            <Popover
              content="Ich bevollmächtige Switch for Climate gemeinnützige UG (haftungsbeschränkt), meine persönlichen Daten zum Zweck des Abschlusses eines Stromliefervertages an das von mir gewählte Energieversorgungsunternehmen weiterzuleiten und die erforderlichen Erklärungen für den Abschluss des Energieliefervertrages gegenüber dem Energieversorgungsunternehmen abzugeben."
              title="Auftrag & Vollmacht"
              trigger="click"
            >
              <a>Vollmacht</a>
            </Popover>{' '}
            zur Verarbeitung meiner Bestellung. Die{' '}
            <a
              href="https://switch-for-climate.de/datenschutz"
              rel="noopener noreferrer"
              target="_blank"
            >
              Datenschutzbestimmungen
            </a>{' '}
            habe ich zur Kenntnis genommen.
          </span>
        }
        name={['approvals', 'ownTerms']}
        rules={[
          {
            message: '',
            required: true,
          },
          {
            validator(_, value) {
              if (value === true) {
                return Promise.resolve()
              }
              return Promise.reject(
                new Error('Bitte akzeptiere unsere Bedingungen.')
              )
            },
          },
        ]}
        valuePropName="checked"
      >
        <Checkbox />
      </Form.Item>

      <Form.Item
        label="Ja, Switch for Climate darf mich per E-Mail zum Thema Klimaschutz informieren. Wir übertreiben es nicht, versprochen!"
        name={['approvals', 'advertising']}
        valuePropName="checked"
      >
        <Checkbox />
      </Form.Item>
    </GroupWrapper>
  )
}
