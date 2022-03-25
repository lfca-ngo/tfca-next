require('./styles.less')

import { Button, Drawer } from 'antd'
import classNames from 'classnames'
import Link from 'next/link'
import React, { useState } from 'react'

import { useContentNavs } from '../../../hooks'
import { DRAWER_WIDTH_MD } from '../../../utils'
import { DisclosureDrawer } from '../../Disclosure/DisclosureDrawer'
import { DarkModeSelector } from '../../Elements/DarkModeSelector'
import { DefaultLogo } from '../../Elements/DefaultLogo'
import { QuestionAnswer } from '../../Elements/QuestionAnswer'
import { IntlSelector } from '../../IntlSelector'

const TOGGLE_Q_AND_A = 'toggle-q-and-a'

export const Nav = ({ company, style }) => {
  const [open, setOpen] = useState(false)
  const [visible, setVisible] = useState(false)
  const toggle = () => setVisible(!visible)
  const mainNav = useContentNavs('mainHeaderNav')

  return (
    <nav className={classNames('nav', 'hidden md', style)}>
      <DefaultLogo />
      <ul>
        {mainNav?.elementsCollection?.items?.map((link) => {
          if (link?.action === TOGGLE_Q_AND_A) {
            return (
              <li key="qa">
                <Button
                  className="no-padding"
                  onClick={() => setOpen(true)}
                  type="link"
                >
                  {link?.title}
                </Button>
                <Drawer
                  className="drawer-md"
                  onClose={() => setOpen(false)}
                  visible={open}
                  width={DRAWER_WIDTH_MD}
                >
                  <QuestionAnswer />
                </Drawer>
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
        {company && <li onClick={toggle}>{company?.company?.name}</li>}
        <li>
          <DarkModeSelector />
        </li>
        <li>
          <IntlSelector />
        </li>
      </ul>
      <DisclosureDrawer data={company} onClose={toggle} visible={visible} />
    </nav>
  )
}
