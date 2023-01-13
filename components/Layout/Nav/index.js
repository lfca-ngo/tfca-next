require('./styles.less')

import { DownOutlined } from '@ant-design/icons'
import classNames from 'classnames'
import React, { useState } from 'react'

import { INVITE_STATUS, PERSONAL_SCORE } from '../../../utils'
import { DefaultLogo, Hamburger } from '../../Elements'
import { MenuItem } from './MenuItem'

export const MainMenu = ({ addOnItems, className = '', items, mode }) => {
  const [openSubKeys, setOpenSubKeys] = useState([])
  return (
    <ul
      className={`main-menu ${className}`}
      // mode={mode || 'horizontal'}
      // onOpenChange={(keys) => setOpenSubKeys(keys)}
    >
      <MenuItem key="score" link={{ action: PERSONAL_SCORE }} />
      <MenuItem key="invited" link={{ action: INVITE_STATUS }} />
      {items?.map((item, i) => {
        const itemKey = `item-${i}`
        const isOpen = openSubKeys.includes(itemKey)
        if (item?.elements) {
          return (
            <MenuItem
              dropdownItems={item.elements || []}
              key={`sub-${j}`}
              link={item}
            />
          )
        }
        return <MenuItem key={itemKey} link={item} />
      })}
      {addOnItems && addOnItems.map((item) => item)}
    </ul>
  )
}

export const Nav = ({ addOnItems, className, menuItems, mode, theme }) => {
  console.log(menuItems)
  return (
    <nav className={classNames('nav', className, mode, theme)}>
      <div className="nav-container">
        <DefaultLogo isDarkMode={false} />
        <MainMenu
          addOnItems={addOnItems}
          className="hidden md-max"
          items={menuItems}
        />
        <Hamburger
          content={
            <MainMenu addOnItems={addOnItems} items={menuItems} mode="inline" />
          }
          mode={mode}
        />
      </div>
    </nav>
  )
}
