import { Tabs } from 'antd'
import { useRouter } from 'next/router'
import React from 'react'

import { useChallenge } from '../../../hooks/useChallenge'
import { useFlow } from '../../../hooks/useFlow'
import { text } from '../../../utils/Text'
import { Share } from '../helpers/Share'
import Success from '../helpers/Success'
import { Details } from './Details'
import { Filter } from './Filter'
import { Results } from './Results'

const { TabPane } = Tabs

const steps = new Map([
  ['country', { component: Filter }],
  ['topic', { component: Filter }],
  ['results', { component: Results }],
  ['details', { component: Details }],
  ['success', { component: Success }],
  ['share', { component: Share }],
])

const PoliticsFlow = (props) => {
  const { locale } = useRouter()
  const { goTo, index, setStore, store } = useFlow({
    id: props.module?.id,
    initialIndex: 'country',
    initialStore: {
      availableFilters: {
        country: [],
        topic: [],
        // country:
        //   props.module?.data.countries.items.map((item) => ({
        //     iconUrl: item.icon?.url,
        //     label: item.label,
        //     value: item.valueString,
        //   })) || [],
        // topic:
        //   props.module?.data.topics.items.map((item) => ({
        //     delegationsCommittees: item.delegationsCommittees,
        //     label: item.label,
        //     messages: item.messagesCollection.items,
        //     value: item.label,
        //   })) || [],
      },
      country: {
        value: getCountryFromLocale(locale),
      },
      selectedItem: {},
      topic: undefined,
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
          const { component: Page } = steps.get(key)
          const nextKey = i <= stepsKeys.length ? stepsKeys[i + 1] : null
          const prevKey = i > 0 ? stepsKeys[i - 1] : null

          return (
            <TabPane key={key} tab={`${props.name}`}>
              <Page
                blocks={props.module?.blocks || {}}
                customization={customization}
                data={props.module?.data || {}}
                filter={{
                  fieldName: key,
                  hint: text(
                    (props.module?.blocks || {})[`filter.${key}.hint`]
                  ),
                  options: store.availableFilters[key] || [],
                  question: text(
                    (props.module?.blocks || {})[`filter.${key}.title`]
                  ),
                }}
                goTo={goTo}
                icon={props.module?.icon?.url}
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
