import React from 'react'

import { Hamburger, MenuSection, QuestionAnswer } from '../../Elements'
import { ErrorBoundary } from '../../ErrorBoundary'
import { Footer } from '../Footer'

export const EmbedLayout = ({ children }) => {
  return (
    <div className="embedded">
      <Hamburger
        content={<MenuSection content={<QuestionAnswer />} title="Questions" />}
        isFloating
      />
      <ErrorBoundary>{children}</ErrorBoundary>
      <Footer />
    </div>
  )
}
