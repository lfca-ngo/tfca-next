require('./styles.less')

import React from 'react'
import { Element } from 'react-scroll'

import { Hero } from '../../Elements/Hero'
import Template from '../'
import { Header } from '../Header'
import { Nav } from '../Nav'

const SplitLayout = ({ children, nav }) => {
  return (
    <Template>
      <Header actions={nav} />
      <Element id="scroll-container" name="scroll-container">
        <main>
          <Nav className="hidden md" />
          <Hero />
          {children}
        </main>
      </Element>
    </Template>
  )
}

export default SplitLayout
