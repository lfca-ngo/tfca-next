import React from 'react'

import { textBlockToString } from '../../../utils'
import { Text } from '../Text'

export const StepHeader = ({ subtitle, title, vars }) => {
  return (
    <header className="step-header">
      <h2>{textBlockToString(title, vars)}</h2>
      <Text block={subtitle} vars={vars} />
    </header>
  )
}
