require('./styles.less')

import classNames from 'classnames'
import React, { useState } from 'react'

import { useContentBlocks, useCustomization } from '../../../hooks'
import { scrollToId } from '../../../utils'
import { textBlockToString } from '../../../utils'
import { ChallengeStatus, Hero, MenuSection } from '../../Elements'
import { ErrorBoundary } from '../../ErrorBoundary'
import { ActionsNav } from '../ActionsNav'
import { Footer } from '../Footer'
import { MainMenu } from '../MainMenu'
import { Nav } from '../Nav'
import { Template } from '../Template'

export const ActionsLayout = ({ children, company, nav, openGraphInfo }) => {
  const [collapsed, setCollapsed] = useState(true)
  const customization = useCustomization()

  return (
    <Template className={classNames('actions-layout', 'color-base')}>
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
              content={<MainMenu mode="vertical" />}
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
