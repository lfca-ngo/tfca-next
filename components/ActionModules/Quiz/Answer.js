import { Button } from 'antd'
import React from 'react'

import { Text, text } from '../../../utils/Text'
import CallToAction from '../../Elements/CallToAction'
import Category from '../helpers/Category'

export const Answer = ({
  activeQuestion,
  goTo,
  module: { blocks = {}, icon = {} },
  nextKey,
  prevKey,
  store: { answers },
}) => {
  const actions = activeQuestion?.resultActionsCollection
  const lastAnswer = answers?.[activeQuestion?.questionId]
  const { rightAnswerResponse = '', wrongAnswerResponse = '' } = activeQuestion
  const response = lastAnswer ? rightAnswerResponse : wrongAnswerResponse

  return (
    <div className="step">
      <Category
        goBack={prevKey ? () => goTo(prevKey) : undefined}
        icon={icon.url}
        title={text(blocks['category.title'])}
      />
      <Text block={activeQuestion?.result} vars={{ response }} />

      {actions?.items?.map((action, i) => (
        <CallToAction key={`action-${i}`} {...action} />
      ))}

      <Button block onClick={() => goTo(nextKey)} size="large" type="primary">
        Continue
      </Button>
    </div>
  )
}
