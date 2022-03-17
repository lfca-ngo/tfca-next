require('./styles.less')

import Link from 'next/link'
import React, { useState } from 'react'

import { DisclosureDrawer } from '../../Disclosure/DisclosureDrawer'
import { DarkModeSelector } from '../../Elements/DarkModeSelector'
import { IntlSelector } from '../../IntlSelector'

const LINKS = [
  { title: 'Why act?', url: '/privacy' },
  { title: 'Questions?', url: '/imprint' },
]

export const Nav = (props) => {
  const [visible, setVisible] = useState(false)
  const toggle = () => setVisible(!visible)

  return (
    <nav className={`${props.className} nav`}>
      <ul>
        {LINKS.map((link, i) => {
          return (
            <li key={`link-${i}`}>
              <Link href={link.url}>{link.title}</Link>
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
