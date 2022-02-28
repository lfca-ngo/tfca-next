import { Tabs } from 'antd'
import React, { useEffect, useMemo } from 'react'

import { useChallenge } from '../../../hooks/useChallenge'
import { useFlow } from '../../../hooks/useFlow'
import { getFilterOptions } from '../../../utils'
import { text } from '../../../utils/Text'
import { Share } from '../helpers/Share'
import Success from '../helpers/Success'
import Details from './Details'
import Intro from './Intro'
import Results from './Results'

const { TabPane } = Tabs

const steps = new Map([
  ['intro', Intro],
  ['results', Results],
  ['details', Details],
  ['success', Success],
  ['share', Share],
])

const ActionFinderFlow = (props) => {
  const { goTo, index, setStore, store } = useFlow({
    id: props.module?.id,
    initial: 'intro',
  })

  const { filterableAttributes, items } = props.module?.data['main'] || {}

  const availableFilters = useMemo(() => {
    const filters = []
    for (const filterableAttribute of filterableAttributes) {
      const fieldName = filterableAttribute.toLowerCase()
      const collectionName = `${fieldName}Collection`
      const options = getFilterOptions(items, collectionName)
      filters.push({ fieldName, options })
    }
    return filters
  }, [items, filterableAttributes])

  const { customization, setProgress } = useChallenge()

  return (
    <div className="steps-container">
      <Tabs
        activeKey={index}
        animated={{ inkBar: false, tabPane: true }}
        destroyInactiveTabPane
        renderTabBar={() => null}
      >
        {[...steps.keys()].map((key) => {
          const Page = steps.get(key)
          return (
            <TabPane key={key} tab={`${props.name}`}>
              <Page
                availableFilters={availableFilters}
                blocks={props.module?.blocks || {}}
                customization={customization}
                data={props.module?.data || {}}
                goTo={goTo}
                lists={props.module?.lists || {}}
                name={props.name}
                setProgress={setProgress}
                setStore={setStore}
                store={store}
              />
            </TabPane>
          )
        })}
      </Tabs>
    </div>
  )
}

export default ActionFinderFlow
