import { Button, Form } from 'antd'
import React from 'react'

import { text } from '../../../utils/Text'
import { SelectFilter } from '../../Elements/SelectFilter'
import Category from '../helpers/Category'
import { StepHeader } from '../helpers/StepHeader'

export const Filter = ({
  blocks,
  filterOption,
  goTo,
  icon,
  nextKey,
  prevKey,
  setProgress,
  setStore,
  store,
}) => {
  const initialValue = store[filterOption?.fieldName]

  const handleNext = (v) => {
    const value = v[filterOption?.fieldName]

    setStore({ ...store, [filterOption?.fieldName]: value })
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
          <SelectFilter
            filterMode={filterOption?.filterMode}
            options={filterOption?.options || []}
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
