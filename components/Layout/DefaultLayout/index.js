require('./styles.less')

import React from 'react'

import { DefaultHero } from '../../Elements/DefaultHero'
import { ErrorBoundary } from '../../ErrorBoundary'
import Template from '../'
import { Footer } from '../Footer'
import { Nav } from '../Nav'

export const DefaultLayout = ({ children, style, subtitle, title }) => {
  return (
    <Template className="default-layout">
      <Nav className={style} />
      <DefaultHero className={style} subtitle={subtitle} title={title} />
      <main className="container">
        <ErrorBoundary>{children}</ErrorBoundary>
      </main>
      <Footer />
    </Template>
  )
}
