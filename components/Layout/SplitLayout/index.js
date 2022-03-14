require('./styles.less')

import classNames from 'classnames'
import React, { useState } from 'react'

import { EMBED } from '../../../utils'
import { Hero } from '../../Elements/Hero'
import Template from '../'
import { Header } from '../Header'
import { Nav } from '../Nav'

const SplitLayout = ({ children, company, layout, nav }) => {
  const [collapsed, setCollapsed] = useState(true)

  const isEmbed = layout === EMBED
  // for iframe integration return only the content
  if (isEmbed)
    return (
      <div className="embedded" id="scroll-container">
        {children}
      </div>
    )
  return (
    <Template>
      <Header actions={nav} collapsed={collapsed} setCollapsed={setCollapsed} />
      <div className={classNames({ collapsed })} id="scroll-container">
        <main>
          <Nav className="hidden md" company={company} />
          <Hero />
          {children}
        </main>
      </div>
    </Template>
  )
}

export default SplitLayout
