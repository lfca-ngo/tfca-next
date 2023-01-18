import { Tabs } from 'antd'
import React from 'react'

import { useFlow } from '../../../hooks'
import { COMPLETE } from '..'
import { Calculate } from './Calculate'
import { FormCheck } from './FormCheck'
import { FormSwitch } from './FormSwitch'
import { Intro } from './Intro'
import { Results } from './Results'

const { TabPane } = Tabs

const steps = new Map([
  ['intro', Intro],
  ['calculate', Calculate],
  ['form-check', FormCheck],
  ['results', Results],
  ['form-switch', FormSwitch],
])

export const SwitchEnergy = ({ module }) => {
  const stepsKeys = [...steps.keys()]

  const { goTo, index, setStore, store } = useFlow({
    id: module?.id,
    initialIndex: stepsKeys[0],
    stepsKeys,
  })

  const handleGoTo = (key) => {
    console.log('key', key)
    if (key === COMPLETE) module?.onComplete?.()
    else goTo(key)
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
          const Page = steps.get(key)
          const nextKey = i <= stepsKeys.length ? stepsKeys[i + 1] : null
          let prevKey = i > 0 ? stepsKeys[i - 1] : null

          return (
            <TabPane key={key} tab={key}>
              <Page
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
