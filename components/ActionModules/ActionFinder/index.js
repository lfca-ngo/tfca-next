import { Tabs } from 'antd'
import React, { useMemo } from 'react'

import { useFlow } from '../../../hooks'
import { getFilterOptions } from '../../../utils'
import { Share } from '../helpers/Share'
import { Success } from '../helpers/Success'
import { Details } from './Details'
import { Filter } from './Filter'
import { Results } from './Results'

const { TabPane } = Tabs

export const ActionFinderFlow = ({ module }) => {
  const { filters, items } = module?.data['main'] || {}

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
      ['details', { component: Details }],
      ['success', { component: Success }],
      ['share', { component: Share }],
    ])
    return { availableFilters: parsedFilters, steps: dynamicSteps }
  }, [items, filters])

  const stepsKeys = [...steps.keys()]

  const { goTo, index, setStore, store } = useFlow({
    id: module?.id,
    initialIndex: stepsKeys[0],
  })

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
            <TabPane key={key} tab={`${props.name}`}>
              <Page
                availableFilters={availableFilters}
                filterElement={filterElement}
                goTo={(key) => {
                  // TODO: Update progress
                  goTo(key)
                }}
                icon={props.module?.icon?.url}
                id={props.id}
                moduleBlocks={module?.blocks || {}}
                moduleData={module?.data || {}}
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
