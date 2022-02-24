import { Button, Col, Form, Row } from 'antd'
import React from 'react'

import { Text, text } from '../../../utils/Text'
import Category from '../ActionWrapper/Category'

const Results = (props) => {
  console.log(props)

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

      <Form layout="vertical" onFinish={(v) => console.log(v)}>
        filters
      </Form>
    </div>
  )
}

export default Results
