import { List } from 'antd'
import React from 'react'

import { usePoliticians } from '../../../services/politicians'
import { LIST_GRIDS } from '../../../utils'
import { text } from '../../../utils/Text'
import { PoliticianCard } from '../../Elements/Cards'
import Category from '../helpers/Category'
import { StepHeader } from '../helpers/StepHeader'

export const Results = ({
  blocks,
  goTo,
  icon,
  nextKey,
  prevKey,
  setProgress,
  setStore,
  store,
}) => {
  const { data, error, isLoading } = usePoliticians(createPoliticsFilter(store))

  const handleNext = (item) => {
    setStore({ ...store, selectedItem: item })
    setProgress(0.3)
    goTo(nextKey)
  }

  return (
    <div className="step">
      <Category
        goBack
        icon={icon}
        prev={() => goTo(prevKey)}
        title={text(blocks['category.title'])}
      />

      <StepHeader
        subtitle={blocks['message.subtitle']}
        title={blocks['message.title']}
      />

      {error ? (
        <h3>Something went wrong...</h3>
      ) : (
        <List
          dataSource={(data?.items || []).map((item) => ({
            email: item.email,
            imageUrl: item.imageUrl,
            name: item.fullName,
            tags: [item.nationalPoliticalGroup],
          }))}
          grid={LIST_GRIDS['1-col']}
          loading={isLoading}
          renderItem={(item) => (
            <List.Item>
              <PoliticianCard item={item} onNext={handleNext} />
            </List.Item>
          )}
        />
      )}
    </div>
  )
}

function createPoliticsFilter(store) {
  return (store.availableFilters || []).reduce((acc, curr) => {
    const fieldName = curr.fieldName

    const value = store[curr.fieldName]

    switch (curr.filterMode) {
      case 'radio-single':
        acc[fieldName] = value[0]
        break
      case 'radio-multi':
      case 'select-multi':
        acc[fieldName] = value.join(',')
        break

      case 'select-with-optional-input':
        acc[fieldName] = value
        break
      case 'select-single':
      default:
        acc[fieldName] = value
        break
    }

    return acc
  }, {})
}
