require('./styles.less')

import classNames from 'classnames'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'

import { useContentBlocks } from '../../../hooks'
import {
  PREFERRED_HOME_COOKIE_NAME,
  scrollToId,
  setCookie,
} from '../../../utils'
import { textBlockToString } from '../../../utils'
import { ChallengeStatus, Hero, MenuSection } from '../../Elements'
import { ErrorBoundary } from '../../ErrorBoundary'
import { ActionsNav } from '../ActionsNav'
import { Footer } from '../Footer'
import { MainMenu } from '../MainMenu'
import { Nav } from '../Nav'
import { Template } from '../Template'

export const ActionsLayout = ({
  children,
  company,
  nav,
  openGraphInfo,
  team,
}) => {
  const { query } = useRouter()
  const [collapsed, setCollapsed] = useState(true)

  // safe the actionCollectionSlug for navigation
  useEffect(() => {
    if (query.actionCollectionSlug) {
      setCookie(PREFERRED_HOME_COOKIE_NAME, query.actionCollectionSlug)
    }
  }, [query.actionCollectionSlug])

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
          onClick={() => scrollToId(nav[0]?.id)}
          openGraphInfo={openGraphInfo}
          team={team}
        />
        <ErrorBoundary>{children}</ErrorBoundary>
        <Footer />
      </main>
    </Template>
  )
}
