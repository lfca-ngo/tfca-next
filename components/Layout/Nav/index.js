require('./styles.less')

import { Button, Drawer } from 'antd'
import Link from 'next/link'
import React, { useState } from 'react'

import { useContentNavs } from '../../../hooks'
import { DRAWER_WIDTH_MD } from '../../../utils'
import { DisclosureDrawer } from '../../Disclosure/DisclosureDrawer'
import { DarkModeSelector } from '../../Elements/DarkModeSelector'
import { QuestionAnswer } from '../../Elements/QuestionAnswer'
import { IntlSelector } from '../../IntlSelector'

const TOGGLE_Q_AND_A = 'toggle-q-and-a'

export const Nav = (props) => {
  const [open, setOpen] = useState(false)
  const [visible, setVisible] = useState(false)
  const toggle = () => setVisible(!visible)
  const mainNav = useContentNavs('mainHeaderNav')

  return (
    <nav className={`${props.className} nav`}>
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
        {props.company && (
          <li onClick={toggle}>{props.company?.company?.name}</li>
        )}
        <li>
          <DarkModeSelector />
        </li>
        <li>
          <IntlSelector />
        </li>
      </ul>
      <DisclosureDrawer
        data={props.company}
        onClose={toggle}
        visible={visible}
      />
    </nav>
  )
}
