import { Badge, Button, List } from 'antd'
import classNames from 'classnames'
import React from 'react'

import { usePoliticians } from '../../../services/politicians'
import { LIST_GRIDS } from '../../../utils'
import { text } from '../../../utils/text'
import {
  CardView,
  Category,
  FetchError,
  spinnerProps,
  StepHeader,
} from '../../Elements'

export const Results = ({
  availableFilters,
  goTo,
  module: { blocks = {}, icon = {} },
  nextKey,
  prevKey,
  setStore,
  store,
}) => {
  const { data, error, isLoading, refetch } = usePoliticians(
    createPoliticsFilter(availableFilters, store)
  )
  const countSelected = store?.selectedPoliticians?.length || 0

  const toggleSelect = (isSelected, item) => {
    const selectedPoliticians = store.selectedPoliticians || []
    const newSelectedPoliticians = isSelected
      ? selectedPoliticians.filter((i) => i.id !== item.id)
      : [...selectedPoliticians, item]

    setStore({
      ...store,
      politicianSlideIndex: 0,
      selectedPoliticians: newSelectedPoliticians,
    })
  }

  return (
    <div className="step">
      <Category
        goBack={prevKey ? () => goTo(prevKey) : undefined}
        icon={icon.url}
        title={text(blocks['category.title'])}
      />

      <StepHeader
        subtitle={blocks['results.subtitle']}
        title={blocks['results.title']}
      />

      {countSelected > 0 && (
        <Button
          block
          className="mb-30"
          onClick={() => goTo(nextKey)}
          type="primary"
        >
          <Badge
            count={countSelected}
            style={{ background: 'transparent', marginRight: '12px' }}
          />
          {text(blocks['results.button.primary'])}
        </Button>
      )}

      {error ? (
        <FetchError onRefetch={refetch} />
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
          loading={spinnerProps(isLoading)}
          renderItem={(item) => {
            const isSelected =
              (store.selectedPoliticians || []).findIndex(
                (i) => i.id === item.id
              ) > -1
            return (
              <List.Item
                className={classNames('multi-select-list-item', {
                  'is-selected': isSelected,
                })}
              >
                <CardView
                  isSelected={isSelected}
                  item={item}
                  layout="politician"
                  onSelect={toggleSelect}
                />
              </List.Item>
            )
          }}
        />
      )}
    </div>
  )
}

function createPoliticsFilter(availableFilters, store) {
  return (availableFilters || []).reduce((acc, curr) => {
    const fieldName = curr.fieldName
    const value = store[fieldName]

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
