import { Button } from 'antd'
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
        title={text(blocks['category.title'])}
      />
      <StepHeader
        subtitle={blocks['results.content']}
        title={blocks['results.title']}
        vars={{ points: correctAnswers, totalQuestions: quizLength }}
      />
      {actions?.items?.map((action, i) => (
        <CallToAction key={`action-${i}`} {...action} />
      ))}
      <Button block onClick={() => goTo(nextKey)} size="large" type="primary">
        Continue
      </Button>
    </div>
  )
}
