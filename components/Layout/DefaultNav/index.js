require('./styles.less')

import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

import { useDarkMode } from '../../../hooks/useDarkMode'
import { getLogoSrc } from '../../../utils'
import { Hamburger } from '../../Elements/Hamburger'

const NavItems = ({ items }) => {
  return (
    <ul>
      {items?.map((link, i) => {
        return (
          <li key={`link-${i}`}>
            <Link href={link.slug || link.url}>{link.title}</Link>
          </li>
        )
      })}
    </ul>
  )
}

export const DefaultNav = ({ data }) => {
  const [isDarkMode] = useDarkMode()
  const logoSrc = getLogoSrc(isDarkMode)
  return (
    <div className="default-nav">
      <div className="logo">
        <Image height={48} src={logoSrc} width={48} />
      </div>
      <nav>
        <div className="nav-items">
          <NavItems items={data.elementsCollection?.items} />
        </div>

        <Hamburger
          content={<NavItems items={data.elementsCollection?.items} />}
          title="Menu"
        />
      </nav>
    </div>
  )
}
