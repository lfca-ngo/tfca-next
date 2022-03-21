import { Tabs } from 'antd'
import React, { useMemo } from 'react'

import { useFlow } from '../../../hooks'
import { Share } from '../helpers/Share'
import { Success } from '../helpers/Success'
import { Answer } from './Answer'
import { Question } from './Question'

const { TabPane } = Tabs

export const ANSWER_SUFFIX = '_answer'

export const Quiz = ({ module }) => {
  const quizItems = module?.quizCollection?.items

  const { goTo, index, setStore, store } = useFlow({
    id: module?.id,
    initialIndex: quizItems[0]?.questionId,
  })

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
            <TabPane key={key} tab={key}>
              <Page
                activeQuestion={activeQuestion}
                goTo={(key) => {
                  // TODO: Update progress
                  goTo(key)
                }}
                icon={module?.icon?.url}
                moduleBlocks={module?.blocks || {}}
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
