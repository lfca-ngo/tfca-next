require('./styles.less')

import React from 'react'

import { useNavs } from '../../../hooks/useTranslation'
import Template from '../'
import { DefaultNav } from '../DefaultNav'

export const DefaultLayout = ({ children, subtitle, title }) => {
  const nav = useNavs('overview')

  return (
    <Template className="default-layout">
      <DefaultNav data={nav} />
      <header>
        <h1>{title}</h1>
        <h2>{subtitle}</h2>
      </header>

      <main>{children}</main>
    </Template>
  )
}
