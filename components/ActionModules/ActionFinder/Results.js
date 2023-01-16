import { ArrowLeftOutlined } from '@ant-design/icons'
import { Drawer, List } from 'antd'
import React, { useState } from 'react'
import { COMPLETE } from '..'

import { LIST_GRIDS, textBlockToString } from '../../../utils'
import {
  CardView,
  Category,
  DetailHeader,
  DetailView,
  ScrollableFilters,
  StepHeader,
} from '../../Elements'

export const Results = ({
  goTo,
  prevKey,
  nextKey,
  module: { blocks = {}, data = {}, icon = {}, id },
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
      const itemValues = item?.[fieldName]?.map((i) => i.key)
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
        title={textBlockToString(blocks['category.title'])}
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
          closeIcon={
            <div className="back-btn-wrapper">
              <ArrowLeftOutlined />
            </div>
          }
          destroyOnClose
          footer={null}
          onClose={() => setVisible(false)}
          title={
            <DetailHeader item={store?.item} layout={dataMain?.cardLayout} />
          }
          visible={visible}
        >
          <DetailView
            actionId={id}
            blocks={blocks}
            item={store?.item}
            layout={dataMain?.cardLayout}
            onNext={() => goTo(COMPLETE)}
          />
        </Drawer>
      )}
    </div>
  )
}
