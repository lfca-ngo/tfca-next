import { Badge, Button, List } from 'antd'
import classNames from 'classnames'
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
  setStore,
  store,
}) => {
  const { data, error, isLoading } = usePoliticians(createPoliticsFilter(store))
  const countSelected = store?.selectedItems?.length || 0

  const handleNext = () => {
    goTo(nextKey)
  }

  const toggleSelect = (item) => {
    const selectedItems = store.selectedItems || []
    const isSelected = selectedItems.find((i) => i.id === item.id)
    const newSelectedItems = isSelected
      ? selectedItems.filter((i) => i.id !== item.id)
      : [...selectedItems, item]

    setStore({ ...store, selectedItems: newSelectedItems, slideIndex: 0 })
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
        subtitle={blocks['results.subtitle']}
        title={blocks['results.title']}
      />

      {countSelected > 0 && (
        <Button block className="mb-30" onClick={handleNext} type="primary">
          <Badge
            count={countSelected}
            style={{ background: 'transparent', marginRight: '12px' }}
          />
          Continue
        </Button>
      )}

      {error ? (
        <h3>Something went wrong...</h3>
      ) : (
        <List
          dataSource={(data?.items || []).map((item) => ({
            email: item.email,
            id: item.id,
            imageUrl: item.imageUrl,
            name: item.fullName,
            parliament: item.parliament,
            tags: [item.nationalPoliticalGroup],
          }))}
          grid={LIST_GRIDS['1-col']}
          loading={isLoading}
          renderItem={(item) => {
            const isSelected =
              (store.selectedItems || []).findIndex((i) => i.id === item.id) >
              -1
            return (
              <List.Item
                className={classNames('multi-select-list-item', {
                  'is-selected': isSelected,
                })}
              >
                <PoliticianCard
                  isSelected={isSelected}
                  item={item}
                  onNext={toggleSelect}
                />
              </List.Item>
            )
          }}
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
        // We expect the fieldname to have a '.' as delimiter
        const [selectFieldName, inputFieldName] = fieldName.split('.')
        acc[selectFieldName] = value.select
        if (inputFieldName && value.input) {
          acc[inputFieldName] = value.input
        }
        break
      case 'select-single':
      default:
        acc[fieldName] = value
        break
    }

    return acc
  }, {})
}
