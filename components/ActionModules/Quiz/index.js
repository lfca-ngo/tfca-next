import { Tabs } from 'antd'
import dynamic from 'next/dynamic'
import React, { useMemo } from 'react'

import { useApp, useFlow } from '../../../hooks'
import { ComponentPlaceholder } from '../../Elements/ComponentPlaceholder'

const Answer = dynamic(() => import('./Answer').then((mod) => mod.Answer), {
  loading: ComponentPlaceholder,
})
const Question = dynamic(
  () => import('./Question').then((mod) => mod.Question),
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
const Success = dynamic(
  () => import('../helpers/Success').then((mod) => mod.Success),
  {
    loading: ComponentPlaceholder,
  }
)

const { TabPane } = Tabs

export const ANSWER_SUFFIX = '_answer'

export const Quiz = (props) => {
  const quizItems = props.module?.quizCollection?.items

  const { goTo, index, setStore, store } = useFlow({
    id: props.module?.id,
    initialIndex: quizItems[0]?.questionId,
  })

  const { customization, setProgress } = useApp()

  // for every question and answer pair we create one page component
  // that can be accessed via "next" or by calling it's key
  // we store all the answers in the store
  const steps = useMemo(() => {
    const quizSteps = quizItems.map((item) => [
      [item.questionId, { activeQuestion: item, component: Question }],
      [
        `${item.questionId}${ANSWER_SUFFIX}`,
        { activeQuestion: item, component: Answer },
      ],
    ])
    const flattened = [].concat.apply([], quizSteps)
    return new Map([
      ...flattened,
      ['success', { component: Success }],
      ['share', { component: Share }],
    ])
  }, [quizItems])

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
          const { activeQuestion, component: Page } = steps.get(key)
          const nextKey = i <= stepsKeys.length ? stepsKeys[i + 1] : null
          const prevKey = i > 0 ? stepsKeys[i - 1] : null

          return (
            <TabPane key={key} tab={`${props.name}`}>
              <Page
                activeQuestion={activeQuestion}
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
                quizItems={quizItems}
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
