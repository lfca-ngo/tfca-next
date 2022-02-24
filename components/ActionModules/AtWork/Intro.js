import { Button, Col, Form, Row } from 'antd'
import React from 'react'

import { Text, text } from '../../../utils/Text'
import { MultiSelect } from '../../Elements/MultiSelect'
import Category from '../ActionWrapper/Category'

const Intro = (props) => {
  const handleNext = () => {
    props.setProgress(0.3)
    props.goTo('calculate', { smooth: true })
  }
  const handleUsesAlready = () => {
    props.setProgress(0.5)
    props.goTo('check')
  }

  return (
    <div className="step">
      <Category
        title={text(props.blocks['category.title'])}
        type={props.name}
      />
      <h2>{text(props.blocks['intro.title'])}</h2>

      <Form onFinish={(v) => console.log(v)}>
        <Form.Item label="test" name="job-type">
          <MultiSelect items={[{ label: 'Some', value: 'A' }]} />
        </Form.Item>
        <Form.Item>
          <Button htmlType="submit">Submit</Button>
        </Form.Item>
      </Form>

      <Row gutter={12} style={{ marginBottom: '15px' }}>
        <Col md={12} xs={24}>
          <Button block onClick={handleNext} size="large" type="primary">
            <Text asString block={props.blocks['intro.button.primary']} />
          </Button>
        </Col>
        <Col md={12} xs={24}>
          <Button
            block
            ghost
            onClick={handleUsesAlready}
            size="large"
            type="primary"
          >
            <Text asString block={props.blocks['intro.button.secondary']} />
          </Button>
        </Col>
      </Row>

      <Row>
        <Col xs={24}>
          <Text block={props.blocks['intro.hint']} />
        </Col>
      </Row>
    </div>
  )
}

export default Intro
