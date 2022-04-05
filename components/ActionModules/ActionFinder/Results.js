import { Drawer, List } from 'antd'
import React, { useState } from 'react'

import { LIST_GRIDS } from '../../../utils'
import { text } from '../../../utils/Text'
import { CardView } from '../../Elements/Cards'
import { DetailView } from '../../Elements/DetailViews'
import { ScrollableFilters } from '../../Elements/ScrollableFilters'
import Category from '../helpers/Category'
import { StepHeader } from '../helpers/StepHeader'

export const Results = ({
  goTo,
  prevKey,
  nextKey,
  module: { blocks = {}, data = {}, icon = {} },
  setStore,
  store,
  availableFilters = [],
}) => {
  const [visible, setVisible] = useState(false)
  const detailViewType = data.main?.detailViewType || 'drawer'
  const isDrawerView = detailViewType === 'drawer'

  const handleNext = (item) => {
    setStore({ ...store, item: item })
    if (isDrawerView) {
      setVisible(true)
    } else {
      goTo(nextKey)
    }
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

  const dataMain = data['main']
  const dataItems = dataMain?.items || []
  const dataListGrid = dataMain?.listGrid || '1-col'
  const isEqualHeight = dataListGrid === '2-col'

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
            <CardView
              blocks={blocks}
              item={item}
              layout={dataMain?.cardLayout}
              onNext={handleNext}
            />
          </List.Item>
        )}
      />

      {isDrawerView && (
        <Drawer
          className={`drawer-md`}
          destroyOnClose
          footer={null}
          onClose={() => setVisible(false)}
          visible={visible}
        >
          <DetailView
            blocks={blocks}
            item={store?.item}
            layout={dataMain?.cardLayout}
            onNext={() => goTo('success')}
          />
        </Drawer>
      )}
    </div>
  )
}

export default Results
