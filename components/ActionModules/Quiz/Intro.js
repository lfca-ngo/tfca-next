import { Button } from 'antd'
import React from 'react'

import { text } from '../../../utils/Text'
import { Category, GameProgress, StepHeader } from '../../Elements'

export const Intro = ({
  quizLength,
  goTo,
  module: { blocks = {}, icon = {} },
  nextKey,
  prevKey,
}) => {
  return (
    <div className="step">
      <Category
        addOn={<GameProgress answers={{}} totalQuestionCount={quizLength} />}
        goBack={prevKey ? () => goTo(prevKey) : undefined}
        icon={icon.url}
        title={text(blocks['category.title'])}
      />
      <StepHeader
        subtitle={blocks['intro.hint']}
        title={blocks['intro.title']}
      />

      <Button block onClick={() => goTo(nextKey)} size="large" type="primary">
        {text(blocks['intro.button.primary'])}
      </Button>
    </div>
  )
}
