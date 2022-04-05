import { Button, Form } from 'antd'
import React from 'react'

import { validatePostcode } from '../../../utils'
import { text } from '../../../utils/Text'
import { SelectFilter } from '../../Elements/SelectFilter'
import Category from '../helpers/Category'
import { StepHeader } from '../helpers/StepHeader'

export const Filter = ({
  filterOption,
  goTo,
  module: { blocks = {}, icon = {} },
  nextKey,
  prevKey,
  setStore,
  store,
}) => {
  const initialValue = store[filterOption?.fieldName]
  const isPostcode = filterOption?.fieldName === 'countries.zip'
  const validationRules = isPostcode
    ? [{ validator: (_, value) => validatePostcode(value, 'input') }]
    : []

  const handleNext = (v) => {
    const value = v[filterOption?.fieldName]

    setStore({ ...store, [filterOption?.fieldName]: value })
    goTo(nextKey)
  }

  return (
    <div className="step">
      <Category
        goBack={prevKey ? () => goTo(prevKey) : undefined}
        icon={icon.url}
        title={text(blocks['category.title'])}
      />

      <StepHeader
        subtitle={filterOption?.hint}
        title={filterOption?.question}
      />

      <Form layout="vertical" onFinish={handleNext}>
        <Form.Item
          initialValue={initialValue}
          name={filterOption?.fieldName}
          rules={validationRules}
        >
          <SelectFilter
            filterMode={filterOption?.filterMode}
            options={filterOption?.options || []}
            placeholder={filterOption?.placeholder}
            placeholderOptionalInput={filterOption?.placeholderOptionalInput}
          />
        </Form.Item>
        <Form.Item>
          <Button block htmlType="submit" size="large" type="primary">
            {text(blocks['filter.button.primary'])}
          </Button>
        </Form.Item>
      </Form>
    </div>
  )
}
