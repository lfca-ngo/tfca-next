require('./styles.less')

import React from 'react'

import { useNavs } from '../../../hooks/useTranslation'
import { DefaultHero } from '../../Elements/DefaultHero'
import Template from '../'
import { DefaultNav } from '../DefaultNav'
import { Footer } from '../Footer'

export const DefaultLayout = ({ children, style, subtitle, title }) => {
  const nav = useNavs('overview')

  return (
    <Template className="default-layout">
      <DefaultNav data={nav} style={style} />
      <DefaultHero style={style} subtitle={subtitle} title={title} />
      <main className="container">{children}</main>
      <Footer />
    </Template>
  )
}
