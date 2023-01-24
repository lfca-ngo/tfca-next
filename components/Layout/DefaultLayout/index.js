require('./styles.less')

import classNames from 'classnames'
import React from 'react'

import { DefaultHero } from '../../Elements'
import { ErrorBoundary } from '../../ErrorBoundary'
import { Footer } from '../Footer'
import { Nav } from '../Nav'
import { Template } from '../Template'

// simple pages like imprint, privacy, etc.
export const DefaultLayout = ({ children, style, subtitle, theme, title }) => {
  return (
    <Template className={classNames('default-layout', theme)}>
      <Nav theme={theme} />
      <DefaultHero
        className={style}
        subtitle={subtitle}
        theme={theme}
        title={title}
      />
      <main className="container">
        <ErrorBoundary>{children}</ErrorBoundary>
      </main>
      <Footer />
    </Template>
  )
}
