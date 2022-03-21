import { Button, Col, Row } from 'antd'
import React from 'react'

import { Text, text } from '../../../utils/Text'
import Category from '../helpers/Category'
import { StepHeader } from '../helpers/StepHeader'

export const Intro = (props) => {
  const handleNext = () => {
    props.setProgress(0.3)
    props.goTo('calculate')
  }
  const handleUsesAlready = () => {
    props.setProgress(0.5)
    props.goTo('check')
  }

  return (
    <div className="step">
      <Category
        icon={props.icon}
        title={text(props.blocks['category.title'])}
      />

      <StepHeader title={props.blocks['intro.title']} />

      <Row className="btn-wrapper" gutter={12} style={{ marginBottom: '15px' }}>
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
