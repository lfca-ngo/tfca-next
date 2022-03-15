import { Button, Form } from 'antd'
import React from 'react'

import { text } from '../../../utils/Text'
import { Select } from '../../Elements/Select'
import Category from '../helpers/Category'
import { StepHeader } from '../helpers/StepHeader'

export const Filter = ({
  blocks,
  filter,
  goTo,
  icon,
  nextKey,
  prevKey,
  setProgress,
  setStore,
  store,
}) => {
  // take the first filter for the intro screen
  const filterOption = filter || {}
  const initialValue = (store[filterOption?.fieldName] || {}).value

  const handleNext = (v) => {
    const value = v[filterOption?.fieldName]

    const resolvedValue = filterOption.options.find(
      (option) => option.value === value
    )

    setStore({ ...store, [filterOption?.fieldName]: resolvedValue })
    setProgress(0.3)
    goTo(nextKey)
  }

  return (
    <div className="step">
      <Category
        goBack={!!prevKey}
        icon={icon}
        prev={() => goTo(prevKey)}
        title={text(blocks['category.title'])}
      />

      <StepHeader
        subtitle={filterOption?.hint}
        title={filterOption?.question}
      />

      <Form layout="vertical" onFinish={handleNext}>
        <Form.Item initialValue={initialValue} name={filterOption?.fieldName}>
          <Select
            items={filterOption?.options || []}
            placeholder={`Select ${filterOption.fieldName}`}
          />
        </Form.Item>
        <Form.Item>
          <Button block htmlType="submit" size="large" type="primary">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  )
}