import { Tabs } from 'antd'
import React, { useMemo } from 'react'

import { useChallenge } from '../../../hooks/useChallenge'
import { useFlow } from '../../../hooks/useFlow'
import { getFilterOptions } from '../../../utils'
import { Share } from '../helpers/Share'
import Success from '../helpers/Success'
import Details from './Details'
import Filter from './Filter'
import Results from './Results'

const { TabPane } = Tabs

const ActionFinderFlow = (props) => {
  const { filters, items } = props.module?.data['main'] || {}

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

  const [firstStep] = steps.keys()

  const { goTo, index, setStore, store } = useFlow({
    id: props.module?.id,
    initialIndex: firstStep,
  })

  const { customization, setProgress } = useChallenge()

  const stepsKeys = [...steps.keys()]

  return (
    <div className="steps-container">
      <Tabs
        activeKey={index}
        animated={{ inkBar: false, tabPane: true }}
        destroyInactiveTabPane
        renderTabBar={() => null}
      >
        {[...steps.keys()].map((key, i) => {
          const { component: Page, filterElement } = steps.get(key)
          const nextKey = i <= stepsKeys.length ? stepsKeys[i + 1] : null
          const prevKey = i > 0 ? stepsKeys[i - 1] : null
          return (
            <TabPane key={key} tab={`${props.name}`}>
              <Page
                availableFilters={availableFilters}
                blocks={props.module?.blocks || {}}
                customization={customization}
                data={props.module?.data || {}}
                filterElement={filterElement}
                goTo={goTo}
                icon={props.module?.icon?.url}
                lists={props.module?.lists || {}}
                name={props.name}
                nextKey={nextKey}
                prevKey={prevKey}
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
