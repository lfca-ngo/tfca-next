import { Button } from 'antd'
import React from 'react'

import { Text, text } from '../../../utils/Text'
import CallToAction from '../../Elements/CallToAction'
import Category from '../helpers/Category'

const Answer = (props) => {
  const actions = props.activeQuestion?.resultActionsCollection

  const handleNext = () => {
    props.setProgress(0.3)
    props.goTo(props.nextKey, { smooth: true })
  }
  console.log(actions, props)
  return (
    <div className="step">
      <Category
        title={text(props.blocks['category.title'])}
        type={props.name}
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

export default Answer
