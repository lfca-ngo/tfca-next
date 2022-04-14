import React from 'react'

import { useContentBlocks } from '../../../hooks'
import { textBlockToString } from '../../../utils'
import { Hamburger, MenuSection, QuestionAnswer } from '../../Elements'
import { ErrorBoundary } from '../../ErrorBoundary'
import { Footer } from '../Footer'

export const EmbedLayout = ({ children }) => {
  return (
    <div className="embedded">
      <Hamburger
        content={
          <MenuSection
            content={<QuestionAnswer />}
            title={textBlockToString(
              useContentBlocks('menu.section.questions')
            )}
          />
        }
        isFloating
      />
      <ErrorBoundary>{children}</ErrorBoundary>
      <Footer />
    </div>
  )
}
