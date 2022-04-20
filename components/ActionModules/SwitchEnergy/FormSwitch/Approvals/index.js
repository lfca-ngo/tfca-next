import { Checkbox, Form, Popover } from 'antd'
import React from 'react'

import { textBlockToString } from '../../../../../utils'
import { GroupWrapper } from '../GroupWrapper'

export const Approvals = ({
  blocks,
  cancellationLink,
  privacyLink,
  providerAddress,
  providerLegalName,
  termsLink,
}) => {
  return (
    <GroupWrapper
      label={textBlockToString(blocks['switch.approvals.group.label'])}
    >
      <Form.Item
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
                new Error(
                  textBlockToString(
                    blocks['switch.approvals.providerterms.error']
                  )
                )
              )
            },
          },
        ]}
        valuePropName="checked"
      >
        <Checkbox data-testid="switch-energy-form-switch-provider-terms-checkbox">
          <span>
            {textBlockToString(blocks['switch.approvals.providerterms.text1'])}
            <a href={termsLink} rel="noopener noreferrer" target="_blank">
              {textBlockToString(
                blocks['switch.approvals.providerterms.text2']
              )}
            </a>{' '}
            {textBlockToString(blocks['switch.approvals.providerterms.text3'])}
            <a
              href={cancellationLink}
              rel="noopener noreferrer"
              target="_blank"
            >
              {textBlockToString(
                blocks['switch.approvals.providerterms.text4']
              )}
            </a>{' '}
            {textBlockToString(blocks['switch.approvals.providerterms.text5'], {
              providerLegalName,
            })}{' '}
            <Popover
              content={textBlockToString(
                blocks['switch.approvals.providerterms.power.title'],
                { providerAddress, providerLegalName }
              )}
              title={textBlockToString(
                blocks['switch.approvals.providerterms.power.title']
              )}
              trigger="click"
            >
              <a>
                {textBlockToString(
                  blocks['switch.approvals.providerterms.text6']
                )}
              </a>
            </Popover>{' '}
            {textBlockToString(blocks['switch.approvals.providerterms.text7'])}
          </span>
        </Checkbox>
      </Form.Item>

      <Form.Item
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
                new Error(
                  textBlockToString(
                    blocks['switch.approvals.providerterms.error']
                  )
                )
              )
            },
          },
        ]}
        valuePropName="checked"
      >
        <Checkbox data-testid="switch-energy-form-switch-privacy-checkbox">
          <span>
            {textBlockToString(
              blocks['switch.approvals.providerterms.privacy.text1']
            )}{' '}
            <a href={privacyLink} rel="noopener noreferrer" target="_blank">
              {textBlockToString(
                blocks['switch.approvals.providerterms.privacy.text2']
              )}
            </a>{' '}
            {textBlockToString(
              blocks['switch.approvals.providerterms.privacy.text3']
            )}
          </span>
        </Checkbox>
      </Form.Item>

      <Form.Item
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
                new Error(
                  textBlockToString(
                    blocks['switch.approvals.providerterms.privacy.error']
                  )
                )
              )
            },
          },
        ]}
        valuePropName="checked"
      >
        <Checkbox data-testid="switch-energy-form-switch-own-terms-checkbox">
          <span>
            {textBlockToString(blocks['switch.approvals.switchterms.text1'])}{' '}
            <a
              href="https://switch-for-climate.de/agb"
              rel="noopener noreferrer"
              target="_blank"
            >
              {textBlockToString(blocks['switch.approvals.switchterms.text2'])}
            </a>{' '}
            {textBlockToString(blocks['switch.approvals.switchterms.text3'])}{' '}
            <Popover
              content={textBlockToString(
                blocks['switch.approvals.switchterms.popover.content']
              )}
              title={textBlockToString(
                blocks['switch.approvals.switchterms.popover.title']
              )}
              trigger="click"
            >
              <a>
                {textBlockToString(
                  blocks['switch.approvals.switchterms.text4']
                )}
              </a>
            </Popover>{' '}
            {textBlockToString(blocks['switch.approvals.switchterms.text5'])}
            <a
              href="https://switch-for-climate.de/datenschutz"
              rel="noopener noreferrer"
              target="_blank"
            >
              {textBlockToString(blocks['switch.approvals.switchterms.text6'])}
            </a>{' '}
            {textBlockToString(blocks['switch.approvals.switchterms.text7'])}
          </span>
        </Checkbox>
      </Form.Item>

      <Form.Item name={['approvals', 'advertising']} valuePropName="checked">
        <Checkbox>
          {textBlockToString(
            blocks['switch.approvals.switchterms.ads.checkbox']
          )}
        </Checkbox>
      </Form.Item>
    </GroupWrapper>
  )
}
