import { Button, Space } from 'antd'
import React from 'react'

import { text } from '../../../utils/Text'
import CallToAction from '../../Elements/CallToAction'
import { GameProgress } from '../../Elements/GameProgress'
import Category from '../helpers/Category'
import { StepHeader } from '../helpers/StepHeader'

export const Results = ({
  quizLength,
  goTo,
  module: { blocks = {}, icon = {}, lists = {} },
  nextKey,
  prevKey,
  store: { answers },
}) => {
  const actions1 = lists?.['results.actions.list1']
  const actions2 = lists?.['results.actions.list2']
  const correctAnswers = Object.keys(answers).filter(
    (key) => answers[key]
  ).length

  return (
    <div className="step">
      <Category
        addOn={
          <GameProgress
            answers={answers}
            questionNumber={quizLength}
            totalQuestionCount={quizLength}
          />
        }
        goBack={prevKey ? () => goTo(prevKey) : undefined}
        icon={icon.url}
        title={text(blocks['category.title'])}
      />
      <StepHeader
        subtitle={blocks['results.content']}
        title={blocks['results.title']}
        vars={{ points: correctAnswers, totalQuestions: quizLength }}
      />
      <Space direction="vertical" style={{ width: '100%' }}>
        <h4>{actions1?.label}</h4>
        {actions1?.items?.map((action, i) => (
          <CallToAction key={`action-${i}`} {...action} />
        ))}
        {actions2 && (
          <>
            <h4>{actions2?.label}</h4>
            {actions2?.items?.map((action, i) => (
              <CallToAction key={`action-${i}`} {...action} />
            ))}
          </>
        )}
        <h4>Count your action & share</h4>
        <Button block onClick={() => goTo(nextKey)} size="large" type="primary">
          Make it count
        </Button>
      </Space>
    </div>
  )
}
