import { Tabs } from 'antd'
import React from 'react'

import { useFlow } from '../../../hooks'
import { Share } from '../helpers/Share'
import { Success } from '../helpers/Success'
import { Calculate } from './Calculate'
import { CheckProvider } from './CheckProvider'
import { FormSwitch } from './FormSwitch'
import { Intro } from './Intro'
import { Results } from './Results'

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

export const SwitchEnergy = (props) => {
  const { goTo, index, setStore, store } = useFlow({
    id: props.module?.id,
    initialIndex: 'intro',
  })

  const stepsKeys = [...steps.keys()]

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
          const prevKey = i > 0 ? stepsKeys[i - 1] : null

          return (
            <TabPane key={key} tab={`${props.name}`}>
              <Page
                goTo={(key) => {
                  // TODO: Update progress
                  goTo(key)
                }}
                icon={props.module?.icon?.url}
                id={props.id}
                moduleBlocks={props.module?.blocks || {}}
                moduleData={props.module?.data || {}}
                moduleLists={props.module?.lists || {}}
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
