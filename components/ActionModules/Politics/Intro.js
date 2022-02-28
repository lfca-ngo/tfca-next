import { Button, Col, Form, Row } from 'antd'
import React from 'react'

import { Text, text } from '../../../utils/Text'
import Category from '../helpers/Category'

const Intro = (props) => {
  const handleNext = (v) => {
    props.setStore({ ...props.store, type: v.type })
    props.setProgress(0.3)
    props.goTo('results', { smooth: true })
  }

  return (
    <div className="step">
      <Category
        icon={props.icon}
        title={text(props.blocks['category.title'])}
      />
      <h2>Hallo David</h2>
    </div>
  )
}

export default Intro
