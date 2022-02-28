require('./styles.less')

import React from 'react'

import { Hero } from '../../Elements/Hero'
import Template from '../'
import { Header } from '../Header'
import { Nav } from '../Nav'

const SplitLayout = ({ children, nav }) => {
  return (
    <Template>
      <Header actions={nav} />
      <div id="scroll-container">
        <main>
          <Nav className="hidden md" />
          <Hero />
          {children}
        </main>
      </div>
    </Template>
  )
}

export default SplitLayout
