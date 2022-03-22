import { Button } from 'antd'
import React from 'react'

import { text } from '../../../utils/Text'
import { DetailView } from '../../Elements/DetailViews'
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
      <DetailView item={item} layout={cardLayout} />
      <Button
        block
        className="mt-30"
        onClick={() => props.goTo(props.nextKey)}
        size="large"
        type="primary"
      >
        Make it count
      </Button>
    </div>
  )
}

export default Details
