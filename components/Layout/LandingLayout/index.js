require('./styles.less')

import React from 'react'

import { ErrorBoundary } from '../../ErrorBoundary'
import { Footer } from '../Footer'
import { Nav } from '../Nav'
import { Template } from '../Template'

// pages with custom sections like about campaign etc.
export const LandingLayout = ({
  children,
  mainNav,
  navigationStyle,
  style,
}) => {
  return (
    <Template className="landing-layout" withTopbar>
      <Nav
        className={`${style || ''} absolute`}
        menuItems={mainNav}
        mode={navigationStyle}
      />
      <main>
        <ErrorBoundary>{children}</ErrorBoundary>
      </main>
      <Footer />
    </Template>
  )
}
