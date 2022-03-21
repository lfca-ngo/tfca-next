import { Button, Col, Row } from 'antd'
import React from 'react'

import { Text, text } from '../../../utils/Text'
import Category from '../helpers/Category'
import { StepHeader } from '../helpers/StepHeader'

export const Intro = ({ goTo, icon, moduleBlocks }) => {
  return (
    <div className="step">
      <Category icon={icon} title={text(moduleBlocks['category.title'])} />

      <StepHeader title={moduleBlocks['intro.title']} />

      <Row className="btn-wrapper" gutter={12} style={{ marginBottom: '15px' }}>
        <Col md={12} xs={24}>
          <Button
            block
            onClick={() => goTo('calculate')}
            size="large"
            type="primary"
          >
            <Text asString block={moduleBlocks['intro.button.primary']} />
          </Button>
        </Col>
        <Col md={12} xs={24}>
          <Button
            block
            ghost
            onClick={() => goTo('check')}
            size="large"
            type="primary"
          >
            <Text asString block={moduleBlocks['intro.button.secondary']} />
          </Button>
        </Col>
      </Row>

      <Row>
        <Col xs={24}>
          <Text block={moduleBlocks['intro.hint']} />
        </Col>
      </Row>
    </div>
  )
}
