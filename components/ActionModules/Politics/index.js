import { Tabs } from 'antd'
import { useRouter } from 'next/router'
import React, { useMemo } from 'react'

import { ACTION_STATES, useFlow } from '../../../hooks'
import { textBlockToString } from '../../../utils'
import { Details } from './Details'
import { Filter } from './Filter'
import { Results } from './Results'

const { TabPane } = Tabs

export const Politics = ({ module }) => {
  const { locale } = useRouter()

  const { data = {} } = module || {}

  const {
    availableFilters,
    messagesByFilterValue,
    messagesRelatedFilterKey,
    steps,
  } = useMemo(() => {
    const steps = []
    const parsedFilters = []
    const messagesByFilterValue = {}
    let messagesRelatedFilterKey = ''

    for (const dataKey of Object.keys(data)) {
      // Create a filter for each data entry
      const dataItem = data[dataKey]
      const filterMeta = dataItem.filters[0] || {}
      const filterOptions = (dataItem.items || []).map((option) => {
        let value = option.valueString
        // For the topic data we use the joined badges as value
        if (option.delegationsCommittees) {
          value = option.delegationsCommittees.join(',')
          // The messages can be looked up by the joined value
          messagesByFilterValue[value] = option.messages || []
          messagesRelatedFilterKey = filterMeta.key
        }

        return {
          description: textBlockToString(option?.description),
          hasOptionalInput: option.hasOptionalInput,
          iconUrl: option.icon?.url,
          label: option.label,
          value,
        }
      })
      const filterOption = {
        ...filterMeta,
        fieldName: filterMeta.key,
        options: filterOptions,
      }
      parsedFilters.push(filterOption)

      // Create a page for each filter that is marked to render as step
      if (filterOption.renderAsStep) {
        steps.push([
          `${filterOption.fieldName}`,
          { component: Filter, filterOption },
        ])
      }
    }

    const dynamicSteps = new Map([
      ...steps,
      ['results', { component: Results }],
      ['details', { component: Details }],
    ])

    return {
      availableFilters: parsedFilters,
      messagesByFilterValue,
      messagesRelatedFilterKey,
      steps: dynamicSteps,
    }
  }, [data])

  const stepsKeys = [...steps.keys()]

  const { completeAction, goTo, index, setStore, store } = useFlow({
    id: module?.id,
    initialIndex: stepsKeys[0],
    initialStore: {
      activeMessageIndex: 0,
      'countries.zip': {
        select: getCountryFromLocale(locale),
      },
      politicianSlideIndex: 0,
      selectedPoliticians: [],
      sentItems: [],
    },
    stepsKeys,
  })

  const handleGoTo = (key) => {
    // if is last item, open success drawer
    if (key === ACTION_STATES.SUCCESS) {
      completeAction()
      module?.onComplete?.()
    } else goTo(key)
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
          const { component: Page, filterOption } = steps.get(key)
          const nextKey = i <= stepsKeys.length ? stepsKeys[i + 1] : null
          const prevKey = i > 0 ? stepsKeys[i - 1] : null

          return (
            <TabPane key={key} tab={key}>
              <Page
                availableFilters={availableFilters}
                filterOption={filterOption}
                goTo={handleGoTo}
                messagesByFilterValue={messagesByFilterValue}
                messagesRelatedFilterKey={messagesRelatedFilterKey}
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

function getCountryFromLocale(locale) {
  switch (locale) {
    case 'de':
      return 'DE'
    case 'fr':
      return 'FR'
    case 'es':
      return 'ES'

    default:
      return undefined
  }
}
