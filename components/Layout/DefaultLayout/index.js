require('./styles.less')

import React from 'react'

import { useNavs } from '../../../hooks/useTranslation'
import { DefaultHero } from '../../Elements/DefaultHero'
import Template from '../'
import { DefaultNav } from '../DefaultNav'

export const DefaultLayout = ({ children, subtitle, title }) => {
  const nav = useNavs('overview')

  return (
    <Template className="default-layout">
      <DefaultNav data={nav} />
      <DefaultHero subtitle={subtitle} title={title} />

      <main className="container">{children}</main>
    </Template>
  )
}
