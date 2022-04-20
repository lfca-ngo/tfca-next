import { Button } from 'antd'
import React from 'react'

import { textBlockToString } from '../../../utils'
import { Category, GameProgress, Text } from '../../Elements'

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
        title={textBlockToString(blocks['category.title'])}
      />
      <Text block={activeQuestion?.result} vars={{ response }} />

      <Button
        block
        data-testid="quiz-answer-next-btn"
        onClick={() => goTo(nextKey)}
        size="large"
        type="primary"
      >
        {textBlockToString(blocks['answer.button.primary'])}
      </Button>
    </div>
  )
}
