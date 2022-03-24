import { LockOutlined } from '@ant-design/icons'
import { Button, Divider, Form } from 'antd'
import React, { useState } from 'react'

import { text } from '../../../../utils/Text'
import Category from '../../helpers/Category'
import { Approvals } from './Approvals'
// import { EmailReminder } from './EmailReminder'
import { PaymentData } from './PaymentData'
import { PersonalData } from './PersonalData'
import { SwitchData } from './SwitchData'

export const FormSwitch = ({ goTo, icon, moduleBlocks, store }) => {
  // const [visible, setVisible] = useState(false)
  const [loading, setLoading] = useState(false)
  // const { trackEvent } = useAnalytics()
  const [form] = Form.useForm()

  const onFinish = async (props) => {
    const payload = {
      ...props,
      billingAddress: props.billingAddress || props.shippingAddress,
      customerGroup: 'private',
      partner: 'LFCA',
      payment: {
        ...props.payment,
        method: 'debit',
      },
      searchSettings: {
        city: store?.city || '',
        consumption: store?.energy || 0,
        customerGroup: 'private',
        energy: 'power',
        operatorId: store?.operatorId || '',
        state: '',
        street: '',
        zipCode: store?.postcode || '',
      },
      switchRate: {
        cancellationPeriod: store?.item?.cancellationPeriod || null,
        emissions: store?.item?.emissions || [],
        energyMix: store?.item?.energyMix || [],
        extendedTerm: store?.item?.extendedTerm || null,
        id: store?.item?.id || '',
        minimumTerm: store?.item?.minimumTerm || null,
        name: store?.item?.name || '',
        price: {
          basePrice: store?.item?.price?.basePrice || 0,
          workingPrice: store?.item?.price?.workingPrice || 0,
        },
        priceGuarantee: {
          date: store?.item?.priceGuarantee?.date || null,
          period: store?.item?.priceGuarantee?.period || null,
        },
        provider: {
          id: store?.item?.provider?.id || '',
          name: store?.item?.provider?.name || '',
        },
      },
    }

    // TODO: Remove mock implemetation
    setLoading(true)
    const res = { payload, status: 200 }
    setLoading(false)
    if (res?.status === 200) {
      alert(
        'Dieses action module ist noch im BETA Modus. Bitte gedulde dich noch ein paar Tage! timo@lfca.earth'
      )
    } else {
      alert('Etwas ist schiefgelaufen. Bitte melde dich bei timo@lfca.earth')
    }
  }

  return (
    <div className="step">
      <Category
        goBack={() => goTo('results')}
        icon={icon}
        title={text(moduleBlocks['category.title'])}
      />
      <h2>Eine sehr gute Wahl. Du hast es fast geschafft!</h2>

      {/* <div>
        Gerade keine Zeit? Wir senden dir eine{' '}
        <Button
          icon={<MailOutlined />}
          onClick={() => setVisible(true)}
          type="link"
        >
          Erinnerungs-Email
        </Button>
      </div> */}

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
            contact: {
              email: '',
              phone: '',
            },
            desiredDelivery: {
              date: null,
              mode: 'asap',
            },
            meter: {
              id: {
                number: '',
                type: 'number',
              },
            },
            payment: {
              accountDetails: {
                authorization: false,
                bankName: '',
                bic: '',
                iban: '',
              },
            },
            personal: {
              birthday: '',
            },
            previousContract: {
              cancellation: {
                instructed: false,
              },
              customerId: '',
            },
            remember: true,
            separateBillingAddress: false,
            shippingAddress: {
              addition: '',
              city: store?.city,
              firstName: '',
              lastName: '',
              salutation: '',
              streetAddress: '',
              zipCode: store?.postcode,
            },
            type: 'switch',
          }}
          layout="vertical"
          name="switch_provider"
          onFinish={onFinish}
        >
          <Divider />

          <PersonalData
            requireBirthday={
              store.item.provider.connectionDetails.fields
                ?.personal_birthday === 'required'
            }
            requirePhone={
              store.item.provider.connectionDetails.fields?.contact_phone ===
              'required'
            }
            requireSalutation={
              store.item.provider.connectionDetails.fields
                ?.address_salutation === 'required'
            }
          />

          <Divider />

          <SwitchData
            // allowsDesiredDelivery={true} // orderSettings => desiredDelivery
            requirePreviousContractCustomerId={
              store.item.provider.connectionDetails.fields
                ?.previousContract_customerId === 'required'
            }
          />

          <Divider />

          <PaymentData />

          <Divider />

          <Approvals
            cancellationLink={store.item.provider.legalInfo?.cancellationLink}
            privacyLink={store.item.provider.legalInfo?.privacyLink}
            providerAddress={store.item.provider.address || ''}
            providerLegalName={store.item.provider.legalName || ''}
            termsLink={store.item.provider.legalInfo?.termsLink}
          />

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

      {/* <Modal footer={null} onCancel={() => setVisible(false)} visible={visible}>
        <EmailReminder onClose={() => setVisible(false)} />
      </Modal> */}
    </div>
  )
}
