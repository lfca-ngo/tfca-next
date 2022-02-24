import { Tabs } from 'antd'
import React, { useEffect, useMemo } from 'react'

import { useChallenge } from '../../../hooks/useChallenge'
import { useFlow } from '../../../hooks/useFlow'
import { getFilterOptions } from '../../../utils'
import { text } from '../../../utils/Text'
import { Share } from '../ActionWrapper/Share'
import Success from '../ActionWrapper/Success'
import Details from './Details'
import Intro from './Intro'
import Results from './Results'

const { TabPane } = Tabs

const steps = new Map([
  ['intro', Intro],
  ['results', Results],
  ['details', Details],
  ['success', Success],
  ['share', Share],
])

const BankingFlow = (props) => {
  const { goTo, index, setStore, store } = useFlow({
    initial: 'intro',
    name: props.name,
  })

  const banks = props.module?.data['banks']

  const availableBankingTypes = useMemo(
    () => getFilterOptions(banks, 'typeCollection'),
    [banks]
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
                availableBankingTypes={availableBankingTypes}
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

export default BankingFlow
