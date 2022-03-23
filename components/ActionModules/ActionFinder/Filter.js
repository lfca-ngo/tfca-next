import { Button, Form } from 'antd'
import React from 'react'

import { useContentBlocks } from '../../../hooks'
import { SINGLE } from '../../../utils'
import { text } from '../../../utils/Text'
import { SelectFilter } from '../../Elements/SelectFilter'
import Category from '../helpers/Category'
import { StepHeader } from '../helpers/StepHeader'

export const Filter = ({
  filterElement,
  goTo,
  icon,
  moduleBlocks,
  nextKey,
  prevKey,
  setStore,
  store,
}) => {
  const isSingleMode = filterElement?.filterMode.indexOf(SINGLE) > -1
  const labelSingleMode = text(useContentBlocks('label.singlemode'))
  const labelMultiMode = text(useContentBlocks('label.multimode'))
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
        icon={icon}
        title={text(moduleBlocks['category.title'])}
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
            filterMode={filterOption?.filterMode}
            options={filterOption?.options || []}
            placeholder={filterOption?.placeholder}
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
