import { LockOutlined, MailOutlined } from '@ant-design/icons'
import { Button, Divider, Form, Modal } from 'antd'
import React, { useState } from 'react'

import { text } from '../../../../utils/Text'
import Category from '../../helpers/Category'
import { Approvals } from './Approvals'
import { EmailReminder } from './EmailReminder'
import { PaymentData } from './PaymentData'
import { PersonalData } from './PersonalData'
import { SwitchData } from './SwitchData'

export const FormSwitch = ({ goTo, icon, moduleBlocks }) => {
  const [visible, setVisible] = useState(false)
  const [loading, setLoading] = useState(false)
  // const { trackEvent } = useAnalytics()
  const [form] = Form.useForm()

  // TODO: Remove mock implemetation
  const onFinish = async (props) => {
    console.log(props)

    // setLoading(true)
    // const res = { status: 200 }
    // setLoading(false)
    // if (res?.status === 200) {
    //   goTo('success')
    // } else {
    //   alert('Etwas ist schiefgelaufen. Bitte melde dich bei timo@lfca.earth')
    // }
  }

  return (
    <div className="step">
      <Category
        goBack={() => goTo('results')}
        icon={icon}
        title={text(moduleBlocks['category.title'])}
      />
      <h2>Eine sehr gute Wahl. Du hast es fast geschafft!</h2>

      <div>
        Gerade keine Zeit? Wir senden dir eine{' '}
        <Button
          icon={<MailOutlined />}
          onClick={() => setVisible(true)}
          type="link"
        >
          Erinnerungs-Email
        </Button>
      </div>

      <div>
        <Form
          autoComplete="off"
          form={form}
          initialValues={{
            approvals: {
              advertising: false,
              ownTerms: false,
              privacyTerms: false,
              providerTerms: false,
            },
            billingAddress: {
              addition: '5. Stock',
              city: 'Berlin', // Set from Calculate screen and disable changes
              firstName: 'Greta',
              lastName: 'Thunberg',
              salutation: 'mr',
              streetAddress: 'Straße 2',
              zipCode: '12345', // Set from Calculate screen and disable changes
            },
            contact: {
              email: 'greta@lfca.earth',
              phone: '1234565',
            },
            desiredDelivery: {
              date: null,
              mode: 'asap', // Keep this in since it sets the initial state!
            },
            meter: {
              id: {
                number: '12345678',
                type: 'number', // Keep this in since it sets the initial state!
              },
            },
            partner: 'LFCA', // TODO: Add after submitting form
            payment: {
              accountDetails: {
                authorization: true,
                bankName: 'Test Bank',
                bic: 'BYLADEM1001',
                iban: 'DE56120300001063973695',
              },
              method: 'debit', // TODO: hardcoded
            },
            personal: {
              birthday: '2022-03-22T13:56:46.952Z',
            },
            previousContract: {
              cancellation: {
                instructed: false,
              },
              customerId: '123456',
            },
            remember: true,
            separateBillingAddress: true,
            shippingAddress: {
              addition: '5. Stock',
              city: 'Berlin',
              firstName: 'Greta',
              lastName: 'Thunberg',
              salutation: 'mr',
              streetAddress: 'Straße 2',
              zipCode: '12345',
            },
            switchRate: {}, // TODO: Add after submitting form
            type: 'switch', // Keep this in since it sets the initial state!
          }}
          layout="vertical"
          name="switch_provider"
          onFinish={onFinish}
        >
          <Divider />

          <PersonalData
            requireBirthday={true} // orderSettings => personal.birthday
            requirePhone={true} // orderSettings => contact.phone
            requireSalutation={true} // orderSettings => address.salutation
          />

          <Divider />

          <SwitchData
            // allowsDesiredDelivery={true} // orderSettings => desiredDelivery
            requirePreviousContractCustomerId={true} // orderSettings => previousContract.customerId
          />

          <Divider />

          <PaymentData />

          <Divider />

          <Approvals />

          <Form.Item>
            <Button
              block
              htmlType="submit"
              icon={<LockOutlined />}
              loading={loading}
              size="large"
              type="primary"
            >
              Jetzt sicher wechseln
            </Button>
          </Form.Item>
        </Form>
      </div>

      <Modal footer={null} onCancel={() => setVisible(false)} visible={visible}>
        <EmailReminder onClose={() => setVisible(false)} />
      </Modal>
    </div>
  )
}
