require('./styles.less')

import { Button, Drawer } from 'antd'
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

const Menu = ({
  className,
  company,
  items,
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
        <li onClick={toggleCompanyDrawer}>{company?.company?.name}</li>
      )}
      <li>
        <IntlSelector />
      </li>
    </ul>
  )
}

export const Nav = ({ className, company }) => {
  const [qaDrawerOpen, setQaDrawerOpen] = useState(false)
  const [companyDrawerOpen, setCompanyDrawerOpen] = useState(false)

  const mainNav = useContentNavs('mainHeaderNav')

  return (
    <nav className={classNames('nav', className)}>
      <div className="nav-container">
        <DefaultLogo />
        <Menu
          className={'hidden md'}
          company={company}
          items={mainNav?.elementsCollection?.items}
          toggleCompanyDrawer={() => setCompanyDrawerOpen(!companyDrawerOpen)}
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
