import { Button, Form } from 'antd'
import React from 'react'

import { text } from '../../../utils/Text'
import CheckList from '../../Elements/CheckList'
import Category from '../helpers/Category'
import { StepHeader } from '../helpers/StepHeader'
import { SelectPostcodeEnergy } from './SelectPostcodeEnergy'

export const EnergyForm = ({
  initialValues,
  moduleBlocks,
  moduleData,
  onFinish,
}) => {
  return (
    <Form initialValues={initialValues} onFinish={onFinish}>
      <Form.Item
        name="postcodeEnergy"
        rules={[
          { message: 'Gib deine Postleitzahl ein!!', required: true },
          {
            validator: (_, value) => {
              if (!value || value.postcode?.length === 5) {
                return Promise.resolve()
              }

              return Promise.reject(new Error('Postleitzahl ungültig'))
            },
          },
        ]}
      >
        <SelectPostcodeEnergy
          items={moduleData?.['input.energy']?.items}
          placeholderInput={text(moduleBlocks['form.postcode.placeholder'])}
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

export const Calculate = ({
  goTo,
  icon,
  moduleBlocks,
  moduleData,
  moduleLists,
  setStore,
  store,
}) => {
  const inputEnergyOptions = moduleData?.['input.energy']?.items
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
        icon={icon}
        title={text(moduleBlocks['category.title'])}
      />

      <StepHeader title={moduleBlocks['calculate.title']} />

      <CheckList data={moduleLists?.benefits} />

      <EnergyForm
        initialValues={{
          postcodeEnergy: {
            energy: store?.energy || inputEnergyFirstValue,
            postcode: store?.postcode,
          },
        }}
        moduleBlocks={moduleBlocks}
        moduleData={moduleData}
        onFinish={handleFinish}
      />
    </div>
  )
}
