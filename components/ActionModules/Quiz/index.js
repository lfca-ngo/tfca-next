import { Tabs } from 'antd'
import React, { cloneElement, useEffect, useMemo } from 'react'

import { useChallenge } from '../../../hooks/useChallenge'
import { useFlow } from '../../../hooks/useFlow'
import { text } from '../../../utils/Text'
import { Share } from '../helpers/Share'
import Success from '../helpers/Success'
import Answer from './Answer'
import Question from './Question'

const { TabPane } = Tabs

const QuizFlow = (props) => {
  const quizItems = props.module?.quizCollection?.items

  const { goTo, index, setStore, store } = useFlow({
    initial: quizItems[0]?.questionId,
    name: props.name,
  })

  const { customization, setProgress } = useChallenge()

  // for every question and answer pair we create one page component
  // that can be accessed via "next" or by calling it's key
  // we store all the answers in the store
  const steps = useMemo(() => {
    const quizSteps = quizItems.map((item) => [
      [item.questionId, { activeQuestion: item, component: Question }],
      [
        `${item.questionId}_answer`,
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

  return (
    <div className="steps-container">
      <Tabs
        activeKey={index}
        animated={{ inkBar: false, tabPane: true }}
        destroyInactiveTabPane
        renderTabBar={() => null}
      >
        {[...steps.keys()].map((key) => {
          const { activeQuestion, component: Page } = steps.get(key)
          return (
            <TabPane key={key} tab={`${props.name}`}>
              <Page
                activeQuestion={activeQuestion}
                blocks={props.module?.blocks || {}}
                customization={customization}
                data={props.module?.data || {}}
                goTo={goTo}
                lists={props.module?.lists || {}}
                name={props.name}
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
