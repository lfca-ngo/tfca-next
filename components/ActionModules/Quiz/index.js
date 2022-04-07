import { Tabs } from 'antd'
import React, { useMemo } from 'react'

import { useFlow } from '../../../hooks'
import { Success } from '../helpers/Success'
import { Answer } from './Answer'
import { Intro } from './Intro'
import { Question } from './Question'
import { Results } from './Results'

const { TabPane } = Tabs

export const ANSWER_SUFFIX = '_answer'

export const Quiz = ({ module }) => {
  const quizItems = module?.quiz
  const quizLength = quizItems?.length

  // for every question and answer pair we create one page component
  // that can be accessed via "next" or by calling it's key
  // we store all the answers in the store
  const steps = useMemo(() => {
    const quizSteps = quizItems.map((item, i) => {
      const activeQuestion = { ...item, number: i + 1 }
      return [
        [item.questionId, { activeQuestion, component: Question }],
        [
          `${item.questionId}${ANSWER_SUFFIX}`,
          { activeQuestion, component: Answer },
        ],
      ]
    })
    const flattened = [].concat.apply([], quizSteps)
    return new Map([
      ['intro', { component: Intro }],
      ...flattened,
      ['results', { component: Results }],
      ['success', { component: Success }],
    ])
  }, [quizItems])

  const stepsKeys = [...steps.keys()]

  const { goTo, index, setStore, store } = useFlow({
    id: module?.id,
    initialIndex: stepsKeys[0],
    initialStore: {
      answers: {},
    },
    stepsKeys,
  })

  const handleGoTo = (key) => {
    goTo(key)
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
          const { activeQuestion, component: Page } = steps.get(key)
          const nextKey = i <= stepsKeys.length ? stepsKeys[i + 1] : null
          const prevKey = i > 0 ? stepsKeys[i - 1] : null

          return (
            <TabPane key={key} tab={key}>
              <Page
                activeQuestion={activeQuestion}
                goTo={handleGoTo}
                module={module || {}}
                nextKey={nextKey}
                prevKey={prevKey}
                quizLength={quizLength}
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
