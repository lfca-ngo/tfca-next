require('./styles.less')

import { CloseOutlined } from '@ant-design/icons'
import { Button, Drawer, Menu, Popover } from 'antd'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'

import {
  useContentBlocks,
  useContentNavs,
  useCustomization,
} from '../../../hooks'
import { scrollToId } from '../../../utils'
import { textBlockToString } from '../../../utils'
import { Disclosure } from '../../Disclosure'
import {
  ChallengeStatus,
  Hero,
  MenuSection,
  QuestionAnswer,
} from '../../Elements'
import { ErrorBoundary } from '../../ErrorBoundary'
import { IntlSelector } from '../../IntlSelector'
import { ActionsNav } from '../ActionsNav'
import { Footer } from '../Footer'
import { Nav } from '../Nav'
import { MainMenu } from '../Nav'
import { Template } from '../Template'

const PopoverContent = ({ company, onClose }) => {
  return (
    <div className="popover-content">
      <div className="content">
        <div className="logo">
          <div className="logo-wrapper">
            <Image layout="fill" objectFit="contain" src={company?.logoUrl} />
          </div>
        </div>
        <div className="text">
          {textBlockToString(useContentBlocks('menu.company.popover'), {
            name: company?.name,
          })}
        </div>
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
  const [popoverOpen, setPopoverOpen] = useState(false)

  // We need to set this to open with a useEffect in orde to keep the server and client HTML in sync
  // See: https://github.com/vercel/next.js/discussions/17443#discussioncomment-87097
  useEffect(() => {
    setPopoverOpen(true)
  }, [])

  return (
    <Menu.Item key="company">
      <Popover
        content={
          <PopoverContent
            company={company}
            onClose={() => setPopoverOpen(false)}
          />
        }
        overlayClassName="popover-md hidden md-max"
        visible={popoverOpen}
        zIndex={10}
      >
        <span onClick={() => setIsOpen(true)}>{company?.name}</span>
      </Popover>
      <Drawer
        className="drawer-md"
        onClose={() => setIsOpen(!isOpen)}
        visible={isOpen}
      >
        <Disclosure data={company} />
      </Drawer>
    </Menu.Item>
  )
}

export const ActionsLayout = ({ children, company, nav, openGraphInfo }) => {
  const [collapsed, setCollapsed] = useState(true)
  const mainNav = useContentNavs('mainHeaderNav')?.elements
  const customization = useCustomization()

  let addOnItems = [
    <Menu.Item key="intl">
      <IntlSelector />
    </Menu.Item>,
  ]
  if (company) {
    addOnItems = [<CompanyMenuItem company={company} key="co" />, ...addOnItems]
  }

  return (
    <Template>
      <ActionsNav
        actions={nav}
        collapsed={collapsed}
        hamburgerMenu={
          <div>
            <MenuSection
              content={<ChallengeStatus openGraphInfo={openGraphInfo} />}
              title={textBlockToString(
                useContentBlocks('menu.section.challenge')
              )}
            />
            <MenuSection
              content={<QuestionAnswer />}
              title={textBlockToString(
                useContentBlocks('menu.section.questions')
              )}
            />
            <MenuSection
              content={
                <MainMenu
                  addOnItems={addOnItems}
                  items={mainNav.filter((i) => !i.action)}
                  mode="inline"
                />
              }
              title={textBlockToString(useContentBlocks('menu.section.menu'))}
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
          onClick={() => scrollToId(customization?.actionId || nav[0]?.id)}
          openGraphInfo={openGraphInfo}
        />
        <ErrorBoundary>{children}</ErrorBoundary>
        <Footer />
      </main>
    </Template>
  )
}
