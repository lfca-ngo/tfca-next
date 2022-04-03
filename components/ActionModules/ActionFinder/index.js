import { Tabs } from 'antd'
import React, { useMemo } from 'react'

import { useFlow } from '../../../hooks'
import { getFilterOptions } from '../../../utils'
import { Success } from '../helpers/Success'
import { Filter } from './Filter'
import { Results } from './Results'

const { TabPane } = Tabs

export const ActionFinderFlow = ({ module }) => {
  const { filters = [], items } = module?.data['main'] || {}

  const { availableFilters, steps } = useMemo(() => {
    const steps = []
    const parsedFilters = []
    for (const filter of filters) {
      const fieldName = filter?.key.toLowerCase()
      const collectionName = `${fieldName}Collection`
      const options = getFilterOptions(items, collectionName)
      const filterElement = {
        fieldName,
        options,
        ...filter,
      }
      parsedFilters.push(filterElement)
      // create pages for marked filters
      if (filter.renderAsStep) {
        steps.push([
          `${fieldName}`,
          { component: Filter, fieldName, filterElement },
        ])
      }
    }

    const dynamicSteps = new Map([
      ...steps,
      ['results', { component: Results }],
      ['success', { component: Success }],
    ])
    return { availableFilters: parsedFilters, steps: dynamicSteps }
  }, [items, filters])

  const stepsKeys = [...steps.keys()]

  const { goTo, index, setProgress, setStore, store } = useFlow({
    id: module?.id,
    initialIndex: stepsKeys[0],
  })

  const handleGoTo = (key) => {
    const keyIndex = stepsKeys.indexOf(key)
    const progress = keyIndex / (stepsKeys.length - 1)
    setProgress(progress)
    goTo(key)
  }

  return (
    <div className="steps-container">
      <Tabs
        activeKey={index}
        animated={{ inkBar: false, tabPane: true }}
        destroyInactiveTabPane
        renderTabBar={() => null}
      >
        {stepsKeys.map((key, i) => {
          const { component: Page, filterElement } = steps.get(key)
          const nextKey = i <= stepsKeys.length ? stepsKeys[i + 1] : null
          const prevKey = i > 0 ? stepsKeys[i - 1] : null
          return (
            <TabPane key={key} tab={key}>
              <Page
                availableFilters={availableFilters}
                filterElement={filterElement}
                goTo={handleGoTo}
                module={module || {}}
                nextKey={nextKey}
                prevKey={prevKey}
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
