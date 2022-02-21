import { Tabs } from 'antd'
import React from 'react'

import { useChallenge } from '../../../hooks/useChallenge'
import { useFlow } from '../../../hooks/useFlow'
import { Share } from '../ActionWrapper/Share'
import Success from '../ActionWrapper/Success'
import Calculate from './Calculate'
import CheckProvider from './CheckProvider'
import FormSwitch from './FormSwitch'
import Intro from './Intro'
import Results from './Results'

const { TabPane } = Tabs

const steps = {
  calculate: (props) => <Calculate {...props} />,
  check: (props) => <CheckProvider {...props} />,
  form: (props) => <FormSwitch {...props} />,
  intro: (props) => <Intro {...props} />,
  results: (props) => <Results {...props} />,
  share: (props) => <Share {...props} />,
  success: (props) => <Success {...props} />,
}

const SwitchEnergyFlow = (props) => {
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
        {Object.keys(steps).map((key) => {
          const Page = steps[key]
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
                stepRef={props.stepRef}
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
