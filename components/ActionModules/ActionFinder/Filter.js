import { Button, Col, Form, Row } from 'antd'
import React from 'react'

import { Text, text } from '../../../utils/Text'
import { MultiSelect } from '../../Elements/MultiSelect'
import Category from '../helpers/Category'
import { StepHeader } from '../helpers/StepHeader'

const Filter = (props) => {
  // take the first filter for the intro screen
  const filterOption = props.filterElement || {}

  const handleNext = (v) => {
    const value = v[filterOption?.fieldName]
    props.setStore({ ...props.store, [filterOption?.fieldName]: value })
    props.setProgress(0.3)
    props.goTo(props.nextKey)
  }

  return (
    <div className="step">
      <Category
        goBack={!!props.prevKey}
        icon={props.icon}
        prev={() => props.goTo(props.prevKey)}
        title={text(props.blocks['category.title'])}
      />

      <StepHeader
        subtitle={props.filterElement?.hint}
        title={props.filterElement?.question}
      />

      <Form initialValues={props.store} layout="vertical" onFinish={handleNext}>
        <Form.Item label="Choose 1 option" name={filterOption?.fieldName}>
          <MultiSelect items={filterOption?.options} singleMode />
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
