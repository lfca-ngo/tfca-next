import { List } from 'antd'
import React from 'react'

import { LIST_GRIDS } from '../../../utils'
import { text } from '../../../utils/Text'
import {
  ActionCard,
  BankCard,
  EnergyProviderCard,
  OrganizationCard,
} from '../../Elements/Cards'
import { ScrollableFilters } from '../../Elements/ScrollableFilters'
import Category from '../helpers/Category'
import { StepHeader } from '../helpers/StepHeader'

export const Results = ({
  goTo,
  prevKey,
  nextKey,
  icon,
  setStore,
  moduleData,
  moduleBlocks,
  store,
  availableFilters = [],
}) => {
  const handleNext = (item) => {
    setStore({ ...store, item: item })
    goTo(nextKey)
  }

  const filterByAttributes = (item) => {
    // every item needs to pass every filter
    // as soon as one item fails a filter, return false
    for (const availableFilter of availableFilters) {
      const { fieldName } = availableFilter
      const collectionName = `${fieldName}Collection`
      const itemValues = item?.[collectionName]?.items?.map((i) => i.key)
      const storeValues = store[fieldName]
      const isEmpty = !storeValues || storeValues?.length === 0
      const isArray = Array.isArray(storeValues)
      const isMatch = isArray
        ? storeValues?.some((v) => itemValues?.includes(v))
        : itemValues?.includes(storeValues)

      if (!isMatch && !isEmpty) return false
    }
    return true
  }

  const dataMain = moduleData['main']
  const dataItems = dataMain?.items || []
  const dataListGrid = dataMain?.listGrid || '1-col'
  const isEqualHeight = dataListGrid === '2-col'

  return (
    <div className="step">
      <Category
        goBack={prevKey ? () => goTo(prevKey) : undefined}
        icon={icon}
        title={text(moduleBlocks['category.title'])}
      />

      <StepHeader
        subtitle={moduleBlocks['results.subtitle']}
        title={moduleBlocks['results.title']}
      />

      <ScrollableFilters
        availableFilters={availableFilters}
        setStore={setStore}
        store={store}
      />

      <List
        className={`simple-list ${isEqualHeight ? 'equal-height' : ''}`}
        dataSource={dataItems.filter(filterByAttributes)}
        grid={LIST_GRIDS[dataListGrid]}
        renderItem={(item) => (
          <List.Item>
            <ItemCard
              cardLayout={dataMain?.cardLayout}
              item={item}
              onNext={handleNext}
            />
          </List.Item>
        )}
      />
    </div>
  )
}

const ItemCard = (props) => {
  switch (props.cardLayout) {
    case 'action':
      return <ActionCard item={props.item} onNext={props.onNext} />
    case 'bank':
      return <BankCard item={props.item} onNext={props.onNext} />
    case 'organization':
      return <OrganizationCard item={props.item} onNext={props.onNext} />
    case 'energy-provider':
      return <EnergyProviderCard item={props.item} onNext={props.onNext} />
    default:
      return null
  }
}
