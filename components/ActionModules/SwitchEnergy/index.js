import { Tabs } from 'antd'
import React from 'react'

import { useApp, useFlow } from '../../../hooks'
import { Share } from '../helpers/Share'
import Success from '../helpers/Success'
import Calculate from './Calculate'
import CheckProvider from './CheckProvider'
import FormSwitch from './FormSwitch'
import Intro from './Intro'
import Results from './Results'

const { TabPane } = Tabs

const steps = new Map([
  ['intro', Intro],
  ['calculate', Calculate],
  ['check', CheckProvider],
  ['results', Results],
  ['form-switch', FormSwitch],
  ['success', Success],
  ['share', Share],
])

const SwitchEnergyFlow = (props) => {
  const { goTo, index, setStore, store } = useFlow({
    id: props.module?.id,
    initialIndex: 'intro',
  })

  const { customization, setProgress } = useApp()

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
          const Page = steps.get(key)
          const nextKey = i <= stepsKeys.length ? stepsKeys[i + 1] : null
          const prevKey = i > 0 ? stepsKeys[i - 1] : null
          return (
            <TabPane key={key} tab={`${props.name}`}>
              <Page
                blocks={props.module?.blocks || {}}
                customization={customization}
                data={props.module?.data || {}}
                goTo={goTo}
                icon={props.module?.icon?.url}
                id={props.id}
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

export default SwitchEnergyFlow
