import { Button, Col, Form, Row } from 'antd'
import React from 'react'

import { Text, text } from '../../../utils/Text'
import { MultiSelect } from '../../Elements/MultiSelect'
import Category from '../helpers/Category'

const Intro = (props) => {
  // take the first filter for the intro screen
  const [filterOption] = props.availableFilters || []

  const handleNext = (v) => {
    const value = v[filterOption?.fieldName]
    props.setStore({ ...props.store, [filterOption?.fieldName]: value })
    props.setProgress(0.3)
    props.goTo('results', { smooth: true })
  }

  return (
    <div className="step">
      <Category
        icon={props.icon}
        title={text(props.blocks['category.title'])}
      />
      <h2>{text(props.blocks['intro.title'])}</h2>

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

export default Intro
