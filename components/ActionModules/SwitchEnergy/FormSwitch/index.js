import { LockOutlined } from '@ant-design/icons'
import { Button, Divider, Form } from 'antd'
import React, { useEffect } from 'react'

import { useAnalytics } from '../../../../hooks'
import { SWITCH_ENERGY_SUCCESS } from '../../../../services/analytics'
import { useSwitchOrder } from '../../../../services/switchforclimate'
import { textBlockToString } from '../../../../utils'
import {
  Category,
  CheckList,
  FetchError,
  StepHeader,
  Text,
} from '../../../Elements'
import { Approvals } from './Approvals'
import { PaymentData } from './PaymentData'
import { PersonalData } from './PersonalData'
import { SwitchData } from './SwitchData'

export const FormSwitch = ({
  goTo,
  nextKey,
  module: { blocks = {}, icon = {}, lists = {}, id },
  store,
}) => {
  const {
    data,
    error,
    isLoading,
    mutate: switchOrder,
    reset,
  } = useSwitchOrder()
  const [form] = Form.useForm()
  const { trackEvent } = useAnalytics()

  const onFinish = async (props) => {
    // Reset potentially set errors
    reset()

    const payload = {
      ...props,
      additionalInfos: {},
      approvals: {
        advertising: props.approvals.advertising,
        ownTerms: props.approvals.ownTerms,
        providerTerms: props.approvals.providerTerms,
      },
      charityProject: null,
      comparisonRate: {
        cancellationPeriod: null,
        emissions: [],
        energyMix: [],
        extendedTerm: null,
        id: '',
        minimumTerm: null,
        name: '',
        price: {
          basePrice: 0,
          workingPrice: 0,
        },
        priceGuarantee: {
          date: null,
          period: null,
        },
        provider: {
          id: '',
          name: '',
        },
      },
      customerGroup: 'private',
      desiredDelivery:
        store.item?.provider?.connectionDetails?.fields?.desiredDelivery ===
        'hidden'
          ? { mode: 'asap' }
          : props.desiredDelivery,
      partner: 'lfca',
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

    if (payload.previousContract.cancellation.instructed) {
      payload.desiredDelivery.mode = 'asap'
    }

    if (payload.desiredDelivery.mode !== 'date') {
      payload.desiredDelivery.date = null
    }

    if (!payload.separateBillingAddress) {
      payload.billingAddress = null
    }

    switchOrder(payload)
  }

  useEffect(() => {
    if (data?.state === 'received') {
      // Requets was successful
      goTo(nextKey)
      trackEvent({
        name: SWITCH_ENERGY_SUCCESS,
        values: {
          action_id: id,
        },
      })
    }
  }, [data, goTo, id, nextKey, trackEvent])

  return (
    <div className="step">
      <Category
        goBack={() => goTo('results')}
        icon={icon.url}
        title={textBlockToString(blocks['category.title'])}
      />
      <StepHeader title={blocks['form.title']} />
      <CheckList data={lists['order.benefits']?.items} />
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
              mid: {
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
            blocks={blocks}
            requireBirthday={
              store.item?.provider?.connectionDetails?.fields
                ?.personal_birthday === 'required'
            }
            requirePhone={
              store.item?.provider?.connectionDetails?.fields?.contact_phone ===
              'required'
            }
            requireSalutation={
              store.item?.provider?.connectionDetails?.fields
                ?.address_salutation === 'required'
            }
          />

          <Divider />

          <SwitchData
            blocks={blocks}
            disableDesiredDelivery={
              store.item?.provider?.connectionDetails?.fields
                ?.desiredDelivery === 'hidden'
            }
            requirePreviousContractCustomerId={
              store.item?.provider?.connectionDetails?.fields
                ?.previousContract_customerId === 'required'
            }
          />

          <Divider />

          <PaymentData
            blocks={blocks}
            providerLegalName={store.item?.provider.legalName || ''}
          />

          <Divider />

          <Approvals
            blocks={blocks}
            cancellationLink={store.item?.provider.legalInfo?.cancellationLink}
            privacyLink={store.item?.provider.legalInfo?.privacyLink}
            providerAddress={store.item?.provider.address || ''}
            providerLegalName={store.item?.provider.legalName || ''}
            termsLink={store.item?.provider.legalInfo?.termsLink}
          />

          <Form.Item>
            <Button
              block
              data-testid="switch-energy-form-submit-btn"
              disabled={isLoading}
              htmlType="submit"
              icon={<LockOutlined />}
              loading={isLoading}
              size="large"
              type="primary"
            >
              {error
                ? textBlockToString(blocks['switch.button.order.retry'])
                : textBlockToString(blocks['switch.button.order'])}
            </Button>
          </Form.Item>

          <Text block={blocks['switch.order.hint']} />
        </Form>
        {error && <FetchError />}
      </div>
    </div>
  )
}
