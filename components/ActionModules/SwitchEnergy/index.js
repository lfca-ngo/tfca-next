import { Tabs } from 'antd'
import dynamic from 'next/dynamic'
import React from 'react'

import { useApp, useFlow } from '../../../hooks'
import { ComponentPlaceholder } from '../../Elements/ComponentPlaceholder'

const Calculate = dynamic(
  () => import('./Calculate').then((mod) => mod.Calculate),
  {
    loading: ComponentPlaceholder,
  }
)
const CheckProvider = dynamic(
  () => import('./CheckProvider').then((mod) => mod.CheckProvider),
  {
    loading: ComponentPlaceholder,
  }
)
const FormSwitch = dynamic(
  () => import('./FormSwitch').then((mod) => mod.FormSwitch),
  {
    loading: ComponentPlaceholder,
  }
)
const Intro = dynamic(() => import('./Intro').then((mod) => mod.Intro), {
  loading: ComponentPlaceholder,
})
const Results = dynamic(() => import('./Results').then((mod) => mod.Results), {
  loading: ComponentPlaceholder,
})
const Success = dynamic(
  () => import('../helpers/Success').then((mod) => mod.Success),
  {
    loading: ComponentPlaceholder,
  }
)
const Share = dynamic(
  () => import('../helpers/Share').then((mod) => mod.Share),
  {
    loading: ComponentPlaceholder,
  }
)

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
