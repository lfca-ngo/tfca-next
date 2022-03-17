import { Button, Form, Select } from 'antd'
import React from 'react'

import { useBlocks } from '../../../hooks/useTranslation'
import { SINGLE } from '../../../utils'
import { text } from '../../../utils/Text'
import { MultiSelect } from '../../Elements/MultiSelect'
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

  const renderFilterType = () => {
    switch (filterMode) {
      case 'radio-single':
        return <MultiSelect items={filterOption?.options} singleMode={true} />
      case 'radio-multi':
        return <MultiSelect items={filterOption?.options} singleMode={false} />
      case 'select-single':
        return (
          <Select>
            {filterOption?.options.map((option) => (
              <Select.Option key={option.value} value={option.value}>
                {option.label}
              </Select.Option>
            ))}
          </Select>
        )
      case 'select-multi':
        return (
          <Select mode="multiple">
            {filterOption?.options.map((option) => (
              <Select.Option key={option.value} value={option.value}>
                {option.label}
              </Select.Option>
            ))}
          </Select>
        )
      default:
        return null
    }
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
          {renderFilterType()}
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
