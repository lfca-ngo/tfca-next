require('./styles.less')

import classNames from 'classnames'
import React, { useState } from 'react'

import { EMBED, scrollToId } from '../../../utils'
import { Hamburger } from '../../Elements/Hamburger'
import { Hero } from '../../Elements/Hero'
import { QuestionAnswer } from '../../Elements/QuestionAnswer'
import { ErrorBoundary } from '../../ErrorBoundry'
import Template from '../'
import { Footer } from '../Footer'
import { Header } from '../Header'
import { Nav } from '../Nav'
import { TopBar } from '../TopBar'

const SplitLayout = ({ children, company, layout, nav }) => {
  const [collapsed, setCollapsed] = useState(true)
  const isEmbed = layout === EMBED
  // for iframe integration return only the content
  if (isEmbed)
    return (
      <div className="embedded" id="scroll-container">
        <Hamburger content={<QuestionAnswer />} isFloating />
        <ErrorBoundary>{children}</ErrorBoundary>
        <Footer />
      </div>
    )
  return (
    <Template>
      <TopBar />
      <Header actions={nav} collapsed={collapsed} setCollapsed={setCollapsed} />
      <div className={classNames({ collapsed })} id="scroll-container">
        <main>
          <Nav company={company} />
          <Hero onClick={() => scrollToId(nav[0]?.id)} />
          <ErrorBoundary>{children}</ErrorBoundary>
          <Footer />
        </main>
      </div>
    </Template>
  )
}

export default SplitLayout
