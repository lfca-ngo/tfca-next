require('./styles.less')

import { CloseOutlined } from '@ant-design/icons'
import { Button, Drawer, Popover } from 'antd'
import React, { useState } from 'react'

import { useContentNavs } from '../../../hooks'
import { scrollToId } from '../../../utils'
import { Disclosure } from '../../Disclosure'
import { Hero } from '../../Elements/Hero'
import { ErrorBoundary } from '../../ErrorBoundary'
import { IntlSelector } from '../../IntlSelector'
import { ActionsNav } from '../ActionsNav'
import { Footer } from '../Footer'
import { Nav } from '../Nav'
import { Template } from '../Template'
import { TopBar } from '../TopBar'

const PopoverContent = ({ name, onClose }) => {
  return (
    <div className="popover-content">
      <div className="content">
        Find out what {name} is doing for the climate 🌍
      </div>
      <Button
        className="no-padding"
        icon={<CloseOutlined />}
        onClick={onClose}
        type="link"
      />
    </div>
  )
}

const CompanyMenuItem = ({ company }) => {
  const [isOpen, setIsOpen] = useState(false)
  const [popoverOpen, setPopoverOpen] = useState(true)
  return (
    <li>
      <Popover
        content={<PopoverContent onClose={() => setPopoverOpen(false)} />}
        visible={popoverOpen}
      >
        {company.name}
      </Popover>
      <Drawer
        className="drawer-md"
        onClose={() => setIsOpen(!isOpen)}
        visible={isOpen}
      >
        <Disclosure data={company} />
      </Drawer>
    </li>
  )
}

export const ActionsLayout = ({ children, company, nav }) => {
  const [collapsed, setCollapsed] = useState(true)
  const mainNav = useContentNavs('mainHeaderNav')?.items
  let addOnItems = [<IntlSelector key="intl" />]
  if (company) {
    addOnItems = [<CompanyMenuItem company={company} key="co" />, ...addOnItems]
  }

  return (
    <Template>
      <TopBar />

      <ActionsNav
        actions={nav}
        collapsed={collapsed}
        setCollapsed={setCollapsed}
      />

      <Nav
        addOnItems={addOnItems}
        className="hidden md-max"
        menuItems={mainNav}
      />

      <main id="scroll-container">
        <Hero onClick={() => scrollToId(nav[0]?.id)} />
        <ErrorBoundary>{children}</ErrorBoundary>
        <Footer />
      </main>
    </Template>
  )
}
