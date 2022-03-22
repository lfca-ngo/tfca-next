import { Button } from 'antd'
import React from 'react'

import { text } from '../../../utils/Text'
import { DetailView } from '../../Elements/DetailViews'
import Category from '../helpers/Category'

export const Details = ({
  goTo,
  icon,
  moduleBlocks,
  moduleData,
  nextKey,
  prevKey,
  store,
}) => {
  const cardLayout = moduleData?.main?.cardLayout || 'action'
  const item = store.item
  if (!item) return null

  return (
    <div className="step">
      <Category
        goBack={prevKey ? () => goTo(prevKey) : undefined}
        icon={icon}
        title={text(moduleBlocks['category.title'])}
      />
      <DetailView item={item} layout={cardLayout} />
      <Button
        block
        className="mt-30"
        onClick={() => goTo(nextKey)}
        size="large"
        type="primary"
      >
        Make it count
      </Button>
    </div>
  )
}

export default Details
