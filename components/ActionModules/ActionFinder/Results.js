import { Drawer, List } from 'antd'
import React, { useState } from 'react'

import { useIsMobile } from '../../../hooks'
import { LIST_GRIDS } from '../../../utils'
import { text } from '../../../utils/Text'
import { CardView } from '../../Elements/Cards'
import { DetailView } from '../../Elements/DetailViews'
import { ScrollableFilters } from '../../Elements/ScrollableFilters'
import Category from '../helpers/Category'
import { StepHeader } from '../helpers/StepHeader'

const Results = (props) => {
  const [visible, setVisible] = useState(false)
  const isMobile = useIsMobile()
  const detailViewType = props.data?.main?.detailViewType || 'page'
  const isDrawerView = detailViewType === 'drawer'
  const availableFilters = props.availableFilters || []

  const handleNext = (item) => {
    props.setStore({ ...props.store, item: item })
    props.setProgress(0.3)
    if (isDrawerView) {
      setVisible(true)
    } else {
      props.goTo(props.nextKey)
    }
  }

  const filterByAttributes = (item) => {
    // every item needs to pass every filter
    // as soon as one item fails a filter, return false
    for (const availableFilter of availableFilters) {
      const { fieldName } = availableFilter
      const collectionName = `${fieldName}Collection`
      const itemValues = item?.[collectionName]?.items?.map((i) => i.key)
      const storeValues = props.store[fieldName]
      const isEmpty = !storeValues || storeValues?.length === 0
      const isArray = Array.isArray(storeValues)
      const isMatch = isArray
        ? storeValues?.some((v) => itemValues?.includes(v))
        : itemValues?.includes(storeValues)

      if (!isMatch && !isEmpty) return false
    }
    return true
  }

  const dataMain = props.data['main']
  const data = dataMain?.items || []
  const listGrid = dataMain?.listGrid || '1-col'
  const isEqualHeight = listGrid === '2-col'

  return (
    <div className="step">
      <Category
        goBack
        icon={props.icon}
        prev={() => props.goTo(props.prevKey)}
        title={text(props.blocks['category.title'])}
      />

      <StepHeader
        subtitle={props.blocks['results.subtitle']}
        title={props.blocks['results.title']}
      />

      <ScrollableFilters
        availableFilters={availableFilters}
        setStore={props.setStore}
        store={props.store}
      />

      <List
        className={`simple-list ${isEqualHeight ? 'equal-height' : ''}`}
        dataSource={data.filter(filterByAttributes)}
        grid={LIST_GRIDS[listGrid]}
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
          width={isMobile ? '100%' : '700px'}
        >
          <DetailView
            item={props.store?.item}
            layout={dataMain?.cardLayout}
            onNext={() => props.goTo('success')}
          />
        </Drawer>
      )}
    </div>
  )
}

export default Results
