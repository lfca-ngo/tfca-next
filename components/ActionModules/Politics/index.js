import { Tabs } from 'antd'
import { useRouter } from 'next/router'
import React from 'react'

import { useChallenge } from '../../../hooks/useChallenge'
import { useFlow } from '../../../hooks/useFlow'
import { Share } from '../helpers/Share'
import Success from '../helpers/Success'
import { Details } from './Details'
import { Filter } from './Filter'
import { Results } from './Results'

const { TabPane } = Tabs

const PoliticsFlow = (props) => {
  const { locale } = useRouter()

  const { data = {} } = props.module || {}

  const { availableFilters, messagesByFilterValue, messagesFilterKey, steps } =
    React.useMemo(() => {
      const steps = []
      const parsedFilters = []
      const messagesByFilterValue = {}
      let messagesFilterKey = ''

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
            messagesByFilterValue[value] =
              option.messagesCollection?.items || []
            messagesFilterKey = filterMeta.key
          }

          return {
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
        ['success', { component: Success }],
        ['share', { component: Share }],
      ])

      return {
        availableFilters: parsedFilters,
        messagesByFilterValue,
        messagesFilterKey,
        steps: dynamicSteps,
      }
    }, [data])

  const [firstStep] = steps.keys()

  const { goTo, index, setStore, store } = useFlow({
    id: props.module?.id,
    initialIndex: firstStep,
    initialStore: {
      availableFilters,
      'countries.zip': {
        select: getCountryFromLocale(locale),
      },
      messagesByFilterValue,
      messagesFilterKey,
    },
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
          const { component: Page, filterOption } = steps.get(key)
          const nextKey = i <= stepsKeys.length ? stepsKeys[i + 1] : null
          const prevKey = i > 0 ? stepsKeys[i - 1] : null

          return (
            <TabPane key={key} tab={`${props.name}`}>
              <Page
                blocks={props.module?.blocks || {}}
                customization={customization}
                filterOption={filterOption}
                goTo={goTo}
                icon={props.module?.icon?.url}
                id={props.id}
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

export default PoliticsFlow
