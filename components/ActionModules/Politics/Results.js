import { List } from 'antd'
import React from 'react'

import { LIST_GRIDS } from '../../../utils'
import { text } from '../../../utils/Text'
import { PoliticianCard } from '../../Elements/Cards'
import Category from '../helpers/Category'
import { StepHeader } from '../helpers/StepHeader'

export const Results = ({
  blocks,
  error,
  goTo,
  icon,
  isFetching,
  nextKey,
  prevKey,
  setProgress,
  setStore,
  store,
}) => {
  const handleNext = (item) => {
    setStore({ ...store, item: item })
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
        <h3>{error}</h3>
      ) : (
        <List
          dataSource={store.items}
          grid={LIST_GRIDS['1-col']}
          loading={isFetching}
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
