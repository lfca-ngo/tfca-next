import React from 'react'

import { Hamburger } from '../../Elements/Hamburger'
import { QuestionAnswer } from '../../Elements/QuestionAnswer'
import { ErrorBoundary } from '../../ErrorBoundary'
import { Footer } from '../Footer'

export const EmbedLayout = ({ children }) => {
  return (
    <div className="embedded">
      <Hamburger content={<QuestionAnswer />} isFloating />
      <ErrorBoundary>{children}</ErrorBoundary>
      <Footer />
    </div>
  )
}
