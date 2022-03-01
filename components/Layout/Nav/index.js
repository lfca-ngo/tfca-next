require('./styles.less')
import Link from 'next/link'
import React from 'react'

import { IntlSelector } from '../../IntlSelector'

const LINKS = [
  { title: 'Datenschutz', url: '/privacy' },
  { title: 'Impressum', url: '/imprint' },
]

export const Nav = (props) => {
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
        <li>
          <IntlSelector />
        </li>
      </ul>
    </nav>
  )
}
