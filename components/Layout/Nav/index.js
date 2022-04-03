require('./styles.less')

import { CloseOutlined } from '@ant-design/icons'
import { Button, Drawer, Popover } from 'antd'
import classNames from 'classnames'
import Link from 'next/link'
import React, { useState } from 'react'

import { useContentNavs } from '../../../hooks'
import { DisclosureDrawer } from '../../Disclosure/DisclosureDrawer'
import { DefaultLogo } from '../../Elements/DefaultLogo'
import { Hamburger } from '../../Elements/Hamburger'
import { QuestionAnswer } from '../../Elements/QuestionAnswer'
import { IntlSelector } from '../../IntlSelector'

const TOGGLE_Q_AND_A = 'toggle-q-and-a'

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

const Menu = ({
  className,
  company,
  companyInfoVisible,
  items,
  setCompanyInfoVisible,
  toggleCompanyDrawer,
  toggleQaDrawer,
}) => {
  return (
    <ul className={className}>
      {items?.map((link) => {
        if (link?.action === TOGGLE_Q_AND_A) {
          return (
            <li key="qa">
              <Button
                className="no-padding"
                onClick={toggleQaDrawer}
                type="link"
              >
                {link?.title}
              </Button>
            </li>
          )
        }
        return (
          <li key={`link-${link.slug}`}>
            <Link href={link.slug || link.url || '/'}>{link.title}</Link>
          </li>
        )
      })}
      {/* Company Info */}
      {company && (
        <Popover
          content={
            <PopoverContent
              name={company?.company?.name}
              onClose={() => setCompanyInfoVisible(false)}
            />
          }
          onVisibleChange={(visible) => setCompanyInfoVisible(visible)}
          overlayClassName="popover-sm hidden md-max"
          placement="bottom"
          visible={companyInfoVisible}
        >
          <li>
            <Button
              className="no-padding"
              onClick={toggleCompanyDrawer}
              type="link"
            >
              {company?.company?.name}
            </Button>
          </li>
        </Popover>
      )}
      <li>
        <IntlSelector />
      </li>
    </ul>
  )
}

export const Nav = ({ className, company }) => {
  const [companyInfoVisible, setCompanyInfoVisible] = useState(true)
  const [qaDrawerOpen, setQaDrawerOpen] = useState(false)
  const [companyDrawerOpen, setCompanyDrawerOpen] = useState(false)

  const mainNav = useContentNavs('mainHeaderNav')

  const toggleCompanyDrawer = () => {
    setCompanyInfoVisible(false)
    setCompanyDrawerOpen(!companyDrawerOpen)
  }

  return (
    <nav className={classNames('nav', className)}>
      <div className="nav-container">
        <DefaultLogo />
        <Menu
          className={'hidden md-max'}
          company={company}
          companyInfoVisible={companyInfoVisible}
          items={mainNav?.elementsCollection?.items}
          setCompanyInfoVisible={setCompanyInfoVisible}
          toggleCompanyDrawer={toggleCompanyDrawer}
          toggleQaDrawer={() => setQaDrawerOpen(!qaDrawerOpen)}
        />
        <Hamburger
          content={
            <Menu
              company={company}
              items={mainNav?.elementsCollection?.items}
              toggleCompanyDrawer={() =>
                setCompanyDrawerOpen(!companyDrawerOpen)
              }
              toggleQaDrawer={() => setQaDrawerOpen(!qaDrawerOpen)}
            />
          }
        />
      </div>

      {/* Q&A drawer */}
      <Drawer
        className="drawer-md"
        onClose={() => setQaDrawerOpen(!qaDrawerOpen)}
        visible={qaDrawerOpen}
      >
        <QuestionAnswer />
      </Drawer>
      {/* Company Disclosure Info */}
      <DisclosureDrawer
        data={company}
        onClose={() => setCompanyDrawerOpen(!companyDrawerOpen)}
        visible={companyDrawerOpen}
      />
    </nav>
  )
}
