import { Button, Col, Row } from 'antd'
import React from 'react'

// import { commentToHtml, renderAsHtml } from '../../../utils'
import Category from '../Category'

const Intro = (props) => {
  const handleNext = () => {
    props.startCounter()
    props.setProgress(0.3)
    props.goTo('calculate', { smooth: true })
  }
  const handleUsesAlready = () => {
    props.setProgress(0.5)
    props.goTo('check')
  }

  return (
    <div className="step">
      <Category title={props.module.categoryTitle} type={props.name} />
      <h2>{props.module.stepIntroTitle}</h2>
      <Row gutter={12} style={{ marginBottom: '15px' }}>
        <Col md={12} xs={24}>
          <Button block onClick={handleNext} size="large" type="primary">
            {props.module.stepIntroButtonPrimary}
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
            {props.module.stepIntroButtonSecondary}
          </Button>
        </Col>
      </Row>

      <Row>
        <Col xs={24}>jo</Col>
        {/* {renderAsHtml(props.module.stepIntroHint)} */}
      </Row>
    </div>
  )
}

export default Intro
