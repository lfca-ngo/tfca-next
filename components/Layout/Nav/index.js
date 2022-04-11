require('./styles.less')

import classNames from 'classnames'
import React from 'react'

import { DefaultLogo, Hamburger } from '../../Elements'
import { MenuItem } from './MenuItem'

export const MainMenu = ({ addOnItems, className = '', items }) => {
  return (
    <ul className={`main-menu ${className}`}>
      {items?.map((link, i) => (
        <MenuItem key={`menu-${i}`} link={link} />
      ))}
      {addOnItems && addOnItems.map((item) => item)}
    </ul>
  )
}

export const Nav = ({ addOnItems, className, menuItems, mode }) => {
  return (
    <nav className={classNames('nav', className, mode)}>
      <div className="nav-container">
        <DefaultLogo isDarkMode={mode === 'dark'} />
        <MainMenu
          addOnItems={addOnItems}
          className="hidden md-max"
          items={menuItems}
        />
        <Hamburger
          content={<MainMenu addOnItems={addOnItems} items={menuItems} />}
          mode={mode}
        />
      </div>
    </nav>
  )
}
