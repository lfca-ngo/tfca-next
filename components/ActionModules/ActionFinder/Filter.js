import { Button, Form } from 'antd'
import React from 'react'

import { useBlocks } from '../../../hooks/useTranslation'
import { SINGLE } from '../../../utils'
import { text } from '../../../utils/Text'
import { Select } from '../../Elements/Select'
import Category from '../helpers/Category'
import { StepHeader } from '../helpers/StepHeader'

const Filter = ({
  blocks,
  filterElement,
  goTo,
  icon,
  nextKey,
  prevKey,
  setProgress,
  setStore,
  store,
}) => {
  const isSingleMode = filterElement?.filterMode === SINGLE
  const labelSingleMode = text(useBlocks('label.singlemode'))
  const labelMultiMode = text(useBlocks('label.multimode'))
  const filterMode = filterElement?.filterMode
  const filterOption = filterElement || {}

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
        subtitle={filterElement?.hint}
        title={filterElement?.question}
      />

      <Form initialValues={store} layout="vertical" onFinish={handleNext}>
        <Form.Item
          label={isSingleMode ? labelSingleMode : labelMultiMode}
          name={filterOption?.fieldName}
        >
          <Select
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

export default Filter
