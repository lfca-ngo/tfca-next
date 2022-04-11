import { Button } from 'antd'
import React from 'react'

import { Text, text } from '../../../utils/Text'
import { Category } from '../../Elements/Category'
import { GameProgress } from '../../Elements/GameProgress'

export const Answer = ({
  activeQuestion,
  quizLength,
  goTo,
  module: { blocks = {}, icon = {} },
  nextKey,
  prevKey,
  store: { answers },
}) => {
  const lastAnswer = answers?.[activeQuestion?.questionId]
  const { rightAnswerResponse = '', wrongAnswerResponse = '' } = activeQuestion
  const response = lastAnswer ? rightAnswerResponse : wrongAnswerResponse

  return (
    <div className="step">
      <Category
        addOn={
          <GameProgress
            answers={answers}
            questionNumber={activeQuestion?.number}
            totalQuestionCount={quizLength}
          />
        }
        goBack={prevKey ? () => goTo(prevKey) : undefined}
        icon={icon.url}
        title={text(blocks['category.title'])}
      />
      <Text block={activeQuestion?.result} vars={{ response }} />

      <Button block onClick={() => goTo(nextKey)} size="large" type="primary">
        {text(blocks['answer.button.primary'])}
      </Button>
    </div>
  )
}
