require('./styles.less')
import Icon from '@ant-design/icons'
import Link from 'next/link'
import React, { useState } from 'react'

import IconMoon from '../../../assets/icons/moon.svg'
import IconSun from '../../../assets/icons/sun.svg'
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

  const toggleDarkMode = () => setDarkMode(!isDarkMode)

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
          <Icon
            component={isDarkMode ? IconSun : IconMoon}
            onClick={toggleDarkMode}
          />
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
