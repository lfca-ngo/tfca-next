require('./styles.less')

import React, { useState } from 'react'

import { useContentBlocks, useCustomization } from '../../../hooks'
import { scrollToId } from '../../../utils'
import { textBlockToString } from '../../../utils'
import {
  ChallengeStatus,
  Hero,
  MenuSection,
  QuestionAnswer,
} from '../../Elements'
import { ErrorBoundary } from '../../ErrorBoundary'
import { ActionsNav } from '../ActionsNav'
import { Footer } from '../Footer'
import { Nav } from '../Nav'
import { MainMenu } from '../Nav'
import { Template } from '../Template'

export const ActionsLayout = ({
  children,
  company,
  nav,
  openGraphInfo,
  presetUid,
}) => {
  const [collapsed, setCollapsed] = useState(true)
  const customization = useCustomization()

  return (
    <Template presetUid={presetUid}>
      <ActionsNav
        actions={nav}
        collapsed={collapsed}
        hamburgerMenu={
          <div>
            <MenuSection
              content={<ChallengeStatus openGraphInfo={openGraphInfo} />}
              title={textBlockToString(
                useContentBlocks('menu.section.challenge')
              )}
            />
            <MenuSection
              content={<QuestionAnswer />}
              title={textBlockToString(
                useContentBlocks('menu.section.questions')
              )}
            />
            <MenuSection
              content={<MainMenu mode="inline" />}
              title={textBlockToString(useContentBlocks('menu.section.menu'))}
            />
          </div>
        }
        setCollapsed={setCollapsed}
      />

      <Nav className="hidden md-max" company={company} />

      <main id="scroll-container">
        <Hero
          onClick={() => scrollToId(customization?.actionId || nav[0]?.id)}
          openGraphInfo={openGraphInfo}
        />
        <ErrorBoundary>{children}</ErrorBoundary>
        <Footer />
      </main>
    </Template>
  )
}
