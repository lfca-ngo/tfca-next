import { Button, Col, Form, Row } from 'antd'
import React from 'react'

import { Text, text } from '../../../utils/Text'
import { MultiSelect } from '../../Elements/MultiSelect'
import Category from '../ActionWrapper/Category'

const Intro = (props) => {
  console.log(props.availableJobTypes)
  const handleNext = (v) => {
    props.setProgress(0.3)
    props.goTo('results', { smooth: true })
  }

  return (
    <div className="step">
      <Category
        title={text(props.blocks['category.title'])}
        type={props.name}
      />
      <h2>{text(props.blocks['intro.title'])}</h2>

      <Form layout="vertical" onFinish={handleNext}>
        <Form.Item label="Choose 1 option" name="job-type">
          <MultiSelect items={props.availableJobTypes} singleMode />
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
