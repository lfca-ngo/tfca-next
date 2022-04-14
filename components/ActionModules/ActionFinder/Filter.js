import { Button, Form } from 'antd'
import React from 'react'

import { useContentBlocks } from '../../../hooks'
import { SINGLE, textBlockToString } from '../../../utils'
import { Category, SelectFilter, StepHeader } from '../../Elements'

export const Filter = ({
  filterElement,
  goTo,
  module: { blocks = {}, icon = {} },
  nextKey,
  prevKey,
  setStore,
  store,
}) => {
  const isSingleMode = filterElement?.filterMode.indexOf(SINGLE) > -1
  const labelSingleMode = textBlockToString(
    useContentBlocks('label.singlemode')
  )
  const labelMultiMode = textBlockToString(useContentBlocks('label.multimode'))
  const filterOption = filterElement || {}

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
        subtitle={filterElement?.hint}
        title={filterElement?.question}
      />

      <Form initialValues={store} layout="vertical" onFinish={handleNext}>
        <Form.Item
          label={isSingleMode ? labelSingleMode : labelMultiMode}
          name={filterOption?.fieldName}
        >
          <SelectFilter
            enableSelectAll={filterOption?.enableSelectAll}
            filterMode={filterOption?.filterMode}
            options={filterOption?.options || []}
            placeholder={filterOption?.placeholder}
          />
        </Form.Item>
        <Form.Item>
          <Button block htmlType="submit" size="large" type="primary">
            {textBlockToString(blocks['filter.button.primary'])}
          </Button>
        </Form.Item>
      </Form>
    </div>
  )
}
