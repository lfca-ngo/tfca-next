require('./styles.less')
import { BulbOutlined, ThunderboltOutlined } from '@ant-design/icons'
import Link from 'next/link'
import React, { useState } from 'react'

import { useDarkMode } from '../../../hooks/useDarkMode'
import { DisclosureDrawer } from '../../Disclosure/DisclosureDrawer'
import { IntlSelector } from '../../IntlSelector'

const LINKS = [
  { title: 'Why act?', url: '/privacy' },
  { title: 'Questions?', url: '/imprint' },
]

export const Nav = (props) => {
  const [isDarkMode, setDarkMode] = useDarkMode()
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
          <IntlSelector />
        </li>
        <li>
          {isDarkMode ? (
            <BulbOutlined onClick={() => setDarkMode(false)} />
          ) : (
            <ThunderboltOutlined onClick={() => setDarkMode(true)} />
          )}
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
