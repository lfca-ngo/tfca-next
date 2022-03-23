import { Drawer, List } from 'antd'
import React, { useState } from 'react'

import { useIsMobile } from '../../../hooks'
import { LIST_GRIDS, DRAWER_WIDTH_MD } from '../../../utils'
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
  icon,
  setStore,
  moduleData,
  moduleBlocks,
  store,
  availableFilters = [],
}) => {
  const [visible, setVisible] = useState(false)
  const isMobile = useIsMobile()
  const detailViewType = moduleData?.main?.detailViewType || 'page'
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
            <CardView
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
          width={isMobile ? '100%' : DRAWER_WIDTH_MD}
        >
          <DetailView
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
