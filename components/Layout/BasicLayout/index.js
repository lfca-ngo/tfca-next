require('./styles.less')

import React from 'react'

import { useContentNavs } from '../../../hooks'
import { DefaultHero } from '../../Elements/DefaultHero'
import { ErrorBoundary } from '../../ErrorBoundary'
import { Footer } from '../Footer'
import { Nav } from '../Nav'
import { Template } from '../Template'

export const BasicLayout = ({ children, style, subtitle, title }) => {
  const mainNav = useContentNavs('mainHeaderNav')?.elementsCollection?.items
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
