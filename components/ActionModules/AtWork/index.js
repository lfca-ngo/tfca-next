import { Tabs } from 'antd'
import React from 'react'

import { useChallenge } from '../../../hooks/useChallenge'
import { useFlow } from '../../../hooks/useFlow'
import { Share } from '../ActionWrapper/Share'
import Success from '../ActionWrapper/Success'
import Intro from './Intro'

const { TabPane } = Tabs

const steps = new Map([
  ['intro', Intro],
  ['success', Success],
  ['share', Share],
])

const AtWorkFlow = (props) => {
  const { goTo, index, setStore, store } = useFlow({
    initial: 'intro',
    name: props.name,
  })

  const { customization, setProgress } = useChallenge()

  return (
    <div className="steps-container">
      <Tabs
        activeKey={index}
        animated={{ inkBar: false, tabPane: true }}
        destroyInactiveTabPane
        renderTabBar={() => null}
      >
        {[...steps.keys()].map((key) => {
          const Page = steps.get(key)
          return (
            <TabPane key={key} tab={`${props.name}`}>
              <Page
                blocks={props.module?.blocks || {}}
                customization={customization}
                data={props.module?.data || {}}
                goTo={goTo}
                lists={props.module?.lists || {}}
                name={props.name}
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

export default AtWorkFlow
