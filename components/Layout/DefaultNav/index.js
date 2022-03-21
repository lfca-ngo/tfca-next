require('./styles.less')

import { Avatar, Button } from 'antd'
import classNames from 'classnames'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

import { getLogoSrc } from '../../../utils'
import { DarkModeSelector } from '../../Elements/DarkModeSelector'
import { Hamburger } from '../../Elements/Hamburger'

const NavElement = ({ icon, slug, title, type, url }) => {
  return (
    <Link href={slug || url} passHref>
      <Button
        className="nav-element"
        ghost={type === 'button-ghost'}
        icon={
          icon ? (
            <Avatar height={24} size="small" src={icon?.url} width={24} />
          ) : null
        }
        type={type?.indexOf('button') > -1 ? 'primary' : 'link'}
      >
        <span>{title}</span>
      </Button>
    </Link>
  )
}

const NavItems = ({ extra, items }) => {
  return (
    <ul>
      {items?.map((link, i) => {
        return (
          <li key={`link-${i}`}>
            <NavElement {...link} />
          </li>
        )
      })}
      {extra && <li>{extra}</li>}
    </ul>
  )
}

export const DefaultNav = ({ data, style }) => {
  const logoSrc = getLogoSrc(true)
  return (
    <div className={classNames('default-nav', style)}>
      <div className="logo">
        <Link href="/">
          <a>
            <Image height={48} src={logoSrc} width={48} />
          </a>
        </Link>
      </div>
      <nav>
        <div className="nav-items">
          <NavItems
            extra={<DarkModeSelector />}
            items={data.elementsCollection?.items}
          />
        </div>

        <Hamburger
          content={<NavItems items={data.elementsCollection?.items} />}
          title="Menu"
        />
      </nav>
    </div>
  )
}
