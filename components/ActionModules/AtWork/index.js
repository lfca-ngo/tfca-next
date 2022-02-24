import { Tabs } from 'antd'
import React, { useEffect, useMemo } from 'react'

import { useChallenge } from '../../../hooks/useChallenge'
import { useFlow } from '../../../hooks/useFlow'
import { getFilterOptions } from '../../../utils'
import { text } from '../../../utils/Text'
import { Share } from '../ActionWrapper/Share'
import Success from '../ActionWrapper/Success'
import Intro from './Intro'
import Results from './Results'

const { TabPane } = Tabs

const steps = new Map([
  ['intro', Intro],
  ['results', Results],
  ['success', Success],
  ['share', Share],
])

const AtWorkFlow = (props) => {
  const { goTo, index, setStore, store } = useFlow({
    initial: 'intro',
    name: props.name,
  })

  const actions = props.module?.data['actions']

  const availableJobTypes = useMemo(
    () => getFilterOptions(actions, 'tagsCollection'),
    [actions]
  )

  const availableJobLevels = useMemo(
    () => getFilterOptions(actions, 'levelCollection'),
    [actions]
  )

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
                availableJobLevels={availableJobLevels}
                availableJobTypes={availableJobTypes}
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