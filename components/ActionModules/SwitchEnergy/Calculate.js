import { Button, Form } from 'antd'
import React from 'react'

import { validatePostcode } from '../../../utils'
import { text } from '../../../utils/Text'
import { Category } from '../../Elements/Category'
import { CheckList } from '../../Elements/CheckList'
import { StepHeader } from '../../Elements/StepHeader'
import { SelectPostcodeEnergy } from './SelectPostcodeEnergy'

export const EnergyForm = ({
  initialValues,
  onFinish,
  module: { blocks = {}, data = {} },
}) => {
  return (
    <Form initialValues={initialValues} onFinish={onFinish}>
      <Form.Item
        name="postcodeEnergy"
        rules={[
          { message: 'Gib eine gültige Postleitzahl ein', required: true },
          { validator: (_, value) => validatePostcode(value, 'postcode') },
        ]}
      >
        <SelectPostcodeEnergy
          items={data['input.energy']?.items}
          placeholderInput={text(blocks['form.postcode.placeholder'])}
          placeholderSelect="Please select"
        />
      </Form.Item>
      <Form.Item>
        <Button block htmlType="submit" size="large" type="primary">
          Finde passende Tarife
        </Button>
      </Form.Item>
    </Form>
  )
}

export const Calculate = ({ goTo, module, setStore, store }) => {
  const { blocks = {}, data = {}, lists = {}, icon = {} } = module
  const inputEnergyOptions = data['input.energy']?.items
  const inputEnergyFirstValue = inputEnergyOptions?.[0]?.valueNumber

  const handleFinish = (allValues) => {
    setStore({
      energy: allValues.postcodeEnergy?.energy,
      postcode: allValues.postcodeEnergy?.postcode,
    })
    goTo('results')
  }

  return (
    <div className="step">
      <Category
        goBack={() => goTo('intro')}
        icon={icon.url}
        title={text(blocks['category.title'])}
      />

      <StepHeader title={blocks['calculate.title']} />

      <CheckList data={lists.benefits?.items} />

      <EnergyForm
        initialValues={{
          postcodeEnergy: {
            energy: store?.energy || inputEnergyFirstValue,
            postcode: store?.postcode,
          },
        }}
        module={module}
        onFinish={handleFinish}
      />
    </div>
  )
}
