import React from 'react'

import { Text, text } from '../../../utils/Text'

export const StepHeader = (props) => {
  return (
    <header className="step-header">
      <h2>{text(props.title)}</h2>
      <Text block={props.subtitle} />
    </header>
  )
}
