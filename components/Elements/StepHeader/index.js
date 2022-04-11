import React from 'react'

import { Text, text } from '../../../utils/Text'

export const StepHeader = ({ subtitle, title, vars }) => {
  return (
    <header className="step-header">
      <h2>{text(title, vars)}</h2>
      <Text block={subtitle} vars={vars} />
    </header>
  )
}
