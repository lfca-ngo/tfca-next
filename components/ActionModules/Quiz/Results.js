import { Button } from 'antd'
import React from 'react'

import { Text, text } from '../../../utils/Text'
import CallToAction from '../../Elements/CallToAction'
import { GameProgress } from '../../Elements/GameProgress'
import Category from '../helpers/Category'

export const Results = ({
  activeQuestion,
  quizLength,
  goTo,
  module: { blocks = {}, icon = {} },
  nextKey,
  prevKey,
  store: { answers },
}) => {
  const actions = activeQuestion?.resultActionsCollection
  console.log('results', answers)
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
      Results
      {/* <Text block={activeQuestion?.result} vars={{ response }} /> */}
      {/* {actions?.items?.map((action, i) => (
        <CallToAction key={`action-${i}`} {...action} />
      ))} */}
      <Button block onClick={() => goTo(nextKey)} size="large" type="primary">
        Continue
      </Button>
    </div>
  )
}
