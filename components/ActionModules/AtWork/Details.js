import { Button, Col, Form, Row } from 'antd'
import React from 'react'

import { Text, text } from '../../../utils/Text'
import { MultiSelect } from '../../Elements/MultiSelect'
import Category from '../ActionWrapper/Category'

const Details = (props) => {
  const item = props.store?.item
  if (!item) return null

  return (
    <div className="step">
      <Category
        goBack
        prev={() => props.goTo('results')}
        title={text(props.blocks['category.title'])}
        type={props.name}
      />
      <h2>{item.name}</h2>
    </div>
  )
}

export default Details
