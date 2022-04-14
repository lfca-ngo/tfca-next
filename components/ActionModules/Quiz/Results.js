import { Button, Space } from 'antd'
import React from 'react'

import { textBlockToString } from '../../../utils'
import {
  CallToAction,
  Category,
  GameProgress,
  StepHeader,
} from '../../Elements'

export const Results = ({
  quizLength,
  goTo,
  module: { blocks = {}, icon = {}, lists = {} },
  nextKey,
  prevKey,
  store: { answers },
}) => {
  const actions = lists?.['results.actions']
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
        title={textBlockToString(blocks['category.title'])}
      />
      <StepHeader
        subtitle={blocks['results.content']}
        title={blocks['results.title']}
        vars={{ points: correctAnswers, totalQuestions: quizLength }}
      />
      <Space direction="vertical" style={{ width: '100%' }}>
        <h4>{actions?.label}</h4>
        {actions?.items?.map((action, i) => (
          <CallToAction
            key={`action-${i}`}
            onCountMeIn={() => goTo(nextKey)}
            showLeaveModal
            {...action}
          />
        ))}
        <h4 style={{ marginTop: '15px' }}>
          {textBlockToString(blocks['results.finish.title'])}
        </h4>
        <Button block onClick={() => goTo(nextKey)} size="large" type="primary">
          {textBlockToString(blocks['results.finish.button.primary'])}
        </Button>
      </Space>
    </div>
  )
}
