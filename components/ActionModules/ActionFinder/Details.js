import { Button, Col, Form, Row } from 'antd'
import React from 'react'

import { Text, text } from '../../../utils/Text'
import { ActionDetails } from '../../Elements/DetailViews/ActionDetails'
import Category from '../helpers/Category'

const Details = (props) => {
  const cardLayout = props.data?.main?.cardLayout || 'action'
  const item = props.store?.item
  if (!item) return null

  return (
    <div className="step">
      <Category
        goBack
        icon={props.icon}
        prev={() => props.goTo(props.prevKey)}
        title={text(props.blocks['category.title'])}
      />
      <DetailView cardLayout={cardLayout} item={item} />
    </div>
  )
}

const DetailView = (props) => {
  switch (props.cardLayout) {
    case 'action':
      return <ActionDetails item={props.item} />
    default:
      return null
  }
}

export default Details
