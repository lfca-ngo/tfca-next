require('./styles.less')

import { CloseOutlined } from '@ant-design/icons'
import { Button, Drawer, Popover } from 'antd'
import React, { useState } from 'react'

import { useContentNavs } from '../../../hooks'
import { scrollToId } from '../../../utils'
import { Disclosure } from '../../Disclosure'
import { ChallengeStatus } from '../../Elements/ChallengeStatus'
import { Hero } from '../../Elements/Hero'
import { MenuSection } from '../../Elements/MenuSection'
import { QuestionAnswer } from '../../Elements/QuestionAnswer'
import { ErrorBoundary } from '../../ErrorBoundary'
import { IntlSelector } from '../../IntlSelector'
import { ActionsNav } from '../ActionsNav'
import { Footer } from '../Footer'
import { Nav } from '../Nav'
import { MainMenu } from '../Nav'
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
        content={
          <PopoverContent
            name={company?.company?.name}
            onClose={() => setPopoverOpen(false)}
          />
        }
        overlayClassName="popover-md"
        visible={popoverOpen}
      >
        <Button
          className="no-padding"
          onClick={() => setIsOpen(true)}
          type="link"
        >
          {company?.company?.name}
        </Button>
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

export const ActionsLayout = ({ children, company, nav, openGraphInfo }) => {
  const [collapsed, setCollapsed] = useState(true)
  const mainNav = useContentNavs('mainHeaderNav')?.elementsCollection?.items
  let addOnItems = [
    <li key="intl">
      <IntlSelector />
    </li>,
  ]
  if (company) {
    addOnItems = [<CompanyMenuItem company={company} key="co" />, ...addOnItems]
  }

  return (
    <Template>
      <TopBar />

      <ActionsNav
        actions={nav}
        collapsed={collapsed}
        hamburgerMenu={
          <div>
            <MenuSection
              content={<ChallengeStatus openGraphInfo={openGraphInfo} />}
              title="Challenge"
            />
            <MenuSection content={<QuestionAnswer />} title="Questions" />
            <MenuSection
              content={<MainMenu items={mainNav.filter((i) => !i.action)} />}
              title="Menu"
            />
          </div>
        }
        setCollapsed={setCollapsed}
      />

      <Nav
        addOnItems={addOnItems}
        className="hidden md-max"
        menuItems={mainNav}
      />

      <main id="scroll-container">
        <Hero
          onClick={() => scrollToId(nav[0]?.id)}
          openGraphInfo={openGraphInfo}
        />
        <ErrorBoundary>{children}</ErrorBoundary>
        <Footer />
      </main>
    </Template>
  )
}
