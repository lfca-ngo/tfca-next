import React from 'react'

import { useNavs } from '../../../hooks/useTranslation'
import Template from '../'
import { DefaultNav } from '../DefaultNav'

export const DefaultLayout = ({ children, title }) => {
  const nav = useNavs('overview')

  return (
    <Template>
      <DefaultNav data={nav} />
      <h1>{title}</h1>
      <main>{children}</main>
    </Template>
  )
}
