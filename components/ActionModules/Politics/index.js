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

const steps = new Map([
  ['country', Filter],
  ['topic', Filter],
  ['results', Results],
  ['details', Details],
  ['success', Success],
  ['share', Share],
])

const PoliticsFlow = (props) => {
  const { locale } = useRouter()
  const { goTo, index, setStore, store } = useFlow({
    id: props.module?.id,
    initialIndex: 'country',
    initialStore: {
      availableFilters: {
        country:
          props.module?.data.countries.items.map((item) => ({
            iconUrl: item.icon?.url,
            label: item.label,
            value: item.valueString,
          })) || [],
        topic:
          props.module?.data.topics.items.map((item) => ({
            delegationsCommittees: item.delegationsCommittees,
            label: item.label,
            messages: item.messagesCollection.items,
            value: item.label,
          })) || [],
      },
      country: {
        value: getCountryFromLocale(locale),
      },
      item: {},
      items: [],
      topic: undefined,
    },
  })

  const { customization, setProgress } = useChallenge()

  const [isFetching, setIsFetching] = React.useState(false)
  const [error, setError] = React.useState('')

  React.useEffect(() => {
    async function fetchData() {
      try {
        setIsFetching(true)
        const url = `/api/meps?locale=${locale}&filter.countries=${
          store.country.value
        }&filter.badges=${(store.topic?.delegationsCommittees || []).join(',')}`
        const resp = await fetch(url)
        const json = await resp.json()

        setStore((v) => ({
          ...v,
          items: json.items.map((item) => ({
            email: item.email,
            imageUrl: item.imageUrl,
            name: item.fullName,
            sub: item.nationalPoliticalGroup,
          })),
        }))
        setIsFetching(false)
      } catch (e) {
        setIsFetching(false)
        setError(e.message || 'Unkown error')
      }
    }

    fetchData()
  }, [locale, setStore, store.topic, store.country])

  const stepsKeys = [...steps.keys()]

  return (
    <div className="steps-container">
      <Tabs
        activeKey={index}
        animated={{ inkBar: false, tabPane: true }}
        destroyInactiveTabPane
        renderTabBar={() => null}
      >
        {stepsKeys.map((stepsKey, i) => {
          const nextKey = i <= stepsKeys.length ? stepsKeys[i + 1] : null
          const prevKey = i > 0 ? stepsKeys[i - 1] : null

          const Page = steps.get(stepsKey)
          return (
            <TabPane key={stepsKey} tab={`${props.name}`}>
              <Page
                blocks={props.module?.blocks || {}}
                customization={customization}
                data={props.module?.data || {}}
                error={error}
                filter={{
                  fieldName: stepsKey,
                  hint: `Choose ${stepsKey} (how to localize?)`,
                  options: store.availableFilters[stepsKey] || [],
                  question: `${stepsKey} (How to localize?)`,
                }}
                goTo={goTo}
                icon={props.module?.icon?.url}
                isFetching={isFetching}
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
