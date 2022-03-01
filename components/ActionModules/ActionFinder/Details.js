import { Button, Col, Form, Row } from 'antd'
import React from 'react'

import { Text, text } from '../../../utils/Text'
import { MultiSelect } from '../../Elements/MultiSelect'
import Category from '../helpers/Category'

const Details = (props) => {
  const item = props.store?.item
  if (!item) return null

  return (
    <div className="step">
      <Category
        goBack
        icon={props.icon}
        prev={() => props.goTo('results')}
        title={text(props.blocks['category.title'])}
      />
      <h2>{item.name}</h2>
    </div>
  )
}

export default Details
