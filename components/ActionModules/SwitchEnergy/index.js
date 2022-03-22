import { Progress, Tabs } from 'antd'
import React from 'react'

import { useFlow } from '../../../hooks'
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
])

export const SwitchEnergy = ({ module }) => {
  const stepsKeys = [...steps.keys()]

  const { goTo, index, progress, setProgress, setStore, store } = useFlow({
    id: module?.id,
    initialIndex: stepsKeys[0],
  })

  const handleGoTo = (key) => {
    const keyIndex = stepsKeys.indexOf(key)
    const progress = keyIndex / (stepsKeys.length - 1)
    setProgress(progress)
    goTo(key)
  }

  return (
    <div className="steps-container">
      <Progress percent={progress * 100} showInfo={false} />

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
            <TabPane key={key} tab={key}>
              <Page
                goTo={handleGoTo}
                icon={module?.icon?.url}
                moduleBlocks={module?.blocks || {}}
                moduleData={module?.data || {}}
                moduleLists={module?.lists || {}}
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
