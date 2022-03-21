import { Tabs } from 'antd'
import React, { useMemo } from 'react'

import { useApp, useFlow } from '../../../hooks'
import { Share } from '../helpers/Share'
import Success from '../helpers/Success'
import Answer from './Answer'
import Question from './Question'

export const ANSWER_SUFFIX = '_answer'

const { TabPane } = Tabs

const QuizFlow = (props) => {
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

export default QuizFlow
