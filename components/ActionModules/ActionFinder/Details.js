import { Button } from 'antd'
import React from 'react'

import { text } from '../../../utils/Text'
import {
  ActionDetails,
  BankDetails,
  EnergyProviderDetails,
  OrganizationDetails,
} from '../../Elements/DetailViews'
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
      <DetailView cardLayout={cardLayout} item={item} />
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

const DetailView = (props) => {
  switch (props.cardLayout) {
    case 'action':
      return <ActionDetails item={props.item} />
    case 'bank':
      return <BankDetails item={props.item} />
    case 'organization':
      return <OrganizationDetails item={props.item} />
    case 'energy-provider':
      return <EnergyProviderDetails item={props.item} />
    default:
      return null
  }
}
