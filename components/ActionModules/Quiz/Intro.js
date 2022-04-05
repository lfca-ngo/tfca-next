import { Button } from 'antd'
import React from 'react'

import { Text, text } from '../../../utils/Text'
import { GameProgress } from '../../Elements/GameProgress'
import Category from '../helpers/Category'
import { StepHeader } from '../helpers/StepHeader'

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
