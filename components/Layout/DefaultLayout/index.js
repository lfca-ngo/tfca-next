require('./styles.less')

import classNames from 'classnames'
import React from 'react'

import { DefaultHero } from '../../Elements'
import { ErrorBoundary } from '../../ErrorBoundary'
import { Footer } from '../Footer'
import { Nav } from '../Nav'
import { Template } from '../Template'

export const DefaultLayout = ({
  children,
  subtitle,
  theme,
  title,
  withContainer,
  withPageTitle,
}) => {
  return (
    <Template
      className={classNames('default-layout', theme, {
        'with-page-title': withPageTitle,
      })}
    >
      <Nav />
      {withPageTitle && <DefaultHero subtitle={subtitle} title={title} />}
      <main className={withContainer ? 'container-max' : ''}>
        <ErrorBoundary>{children}</ErrorBoundary>
      </main>
      <Footer />
    </Template>
  )
}
