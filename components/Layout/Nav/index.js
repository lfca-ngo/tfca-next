require('./styles.less')

import Link from 'next/link'
import React, { useState } from 'react'

import { useNavs } from '../../../hooks/useTranslation'
import { DisclosureDrawer } from '../../Disclosure/DisclosureDrawer'
import { DarkModeSelector } from '../../Elements/DarkModeSelector'
import { IntlSelector } from '../../IntlSelector'

export const Nav = (props) => {
  const [visible, setVisible] = useState(false)
  const toggle = () => setVisible(!visible)
  const mainNav = useNavs('mainHeaderNav')

  return (
    <nav className={`${props.className} nav`}>
      <ul>
        {mainNav?.elementsCollection?.items?.map((link) => {
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
