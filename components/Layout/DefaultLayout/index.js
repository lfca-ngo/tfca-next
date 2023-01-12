import React from 'react'

import { DefaultHero } from '../../Elements'
import { ErrorBoundary } from '../../ErrorBoundary'
import { Footer } from '../Footer'
import { Nav } from '../Nav'
import { Template } from '../Template'

// simple pages like imprint, privacy, etc.
export const DefaultLayout = ({
  children,
  mainNav,
  style,
  subtitle,
  title,
}) => {
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
