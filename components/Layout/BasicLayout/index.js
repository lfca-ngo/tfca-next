require('./styles.less')

import React from 'react'

import { useContentNavs } from '../../../hooks'
import { DefaultHero } from '../../Elements'
import { ErrorBoundary } from '../../ErrorBoundary'
import { Footer } from '../Footer'
import { Nav } from '../Nav'
import { Template } from '../Template'

// simple pages like imprint, privacy, etc.
const DefaultLayout = ({ children, mainNav, style, subtitle, title }) => {
  return (
    <Template className="default-layout">
      <Nav className={style} menuItems={mainNav} />
      <DefaultHero className={style} subtitle={subtitle} title={title} />
      <main className="container">
        <ErrorBoundary>{children}</ErrorBoundary>
      </main>
      <Footer />
    </Template>
  )
}

// pages with custom sections like about campaign etc.
const LandingLayout = ({ children, mainNav, navigationStyle, style }) => {
  return (
    <Template className="landing-layout">
      <Nav className={style} menuItems={mainNav} mode={navigationStyle} />
      <main>
        <ErrorBoundary>{children}</ErrorBoundary>
      </main>
      <Footer />
    </Template>
  )
}

export const BasicLayout = (props) => {
  const mainNav = useContentNavs('mainHeaderNav')?.elements
  switch (props.layout) {
    case 'landing':
      return <LandingLayout {...props} mainNav={mainNav} />
    default:
      return <DefaultLayout {...props} mainNav={mainNav} />
  }
}
