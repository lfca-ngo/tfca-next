require('./styles.less')

import React from 'react'

import { EMBED } from '../../../utils'
import { Hero } from '../../Elements/Hero'
import Template from '../'
import { Header } from '../Header'
import { Nav } from '../Nav'

const SplitLayout = ({ children, company, layout, nav }) => {
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
      <Header actions={nav} />
      <div id="scroll-container">
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
