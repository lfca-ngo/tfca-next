import { Button, Col, Form, Row } from 'antd'
import React from 'react'

import { Text, text } from '../../../utils/Text'
import { MultiSelect } from '../../Elements/MultiSelect'
import Category from '../helpers/Category'

const Answer = (props) => {
  // take the first filter for the intro screen

  const handleNext = (v) => {
    // const value = v[filterOption?.fieldName]
    // props.setStore({ ...props.store, [filterOption?.fieldName]: value })
    props.setProgress(0.3)
    // props.goTo('results', { smooth: true })
  }
  console.log('answer', props)
  return (
    <div className="step">
      <Category
        title={text(props.blocks['category.title'])}
        type={props.name}
      />
      {/* <h2>{text(props.blocks['intro.title'])}</h2> */}

      <Button block size="large" type="primary">
        Submit
      </Button>
    </div>
  )
}

export default Answer
