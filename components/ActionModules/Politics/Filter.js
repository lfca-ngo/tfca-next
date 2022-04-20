import { Button, Form } from 'antd'
import React from 'react'

import { textBlockToString, validatePostcode } from '../../../utils'
import { Category, SelectFilter, StepHeader } from '../../Elements'

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
        title={textBlockToString(blocks['category.title'])}
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

        <Form.Item noStyle shouldUpdate>
          {({ getFieldsValue }) => {
            const value = getFieldsValue()[filterOption?.fieldName]
            const isValid = Array.isArray(value) ? !!value.length : !!value
            return (
              <Button
                block
                data-testid="politics-filter-next-btn"
                disabled={!isValid}
                htmlType="submit"
                size="large"
                type="primary"
              >
                {textBlockToString(blocks['filter.button.primary'])}
              </Button>
            )
          }}
        </Form.Item>
      </Form>
    </div>
  )
}
