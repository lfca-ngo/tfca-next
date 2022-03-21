import { Button } from 'antd'
import React from 'react'

import { Text, text } from '../../../utils/Text'
import CallToAction from '../../Elements/CallToAction'
import Category from '../helpers/Category'

export const Answer = (props) => {
  const actions = props.activeQuestion?.resultActionsCollection

  const handleNext = () => {
    props.setProgress(0.3)
    props.goTo(props.nextKey)
  }

  return (
    <div className="step">
      <Category
        goBack={!!props.prevKey}
        icon={props.icon}
        prev={() => props.goTo(props.prevKey)}
        title={text(props.blocks['category.title'])}
      />
      <Text block={props.activeQuestion?.result} />

      {actions?.items?.map((action, i) => (
        <CallToAction key={`action-${i}`} {...action} />
      ))}

      <Button block onClick={handleNext} size="large" type="primary">
        Continue
      </Button>
    </div>
  )
}
