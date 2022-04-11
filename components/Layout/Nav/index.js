require('./styles.less')

import { Menu } from 'antd'
import classNames from 'classnames'
import React from 'react'

import { DefaultLogo, Hamburger } from '../../Elements'
import { MenuItem } from './MenuItem'

const { SubMenu } = Menu

export const MainMenu = ({ addOnItems, className = '', items }) => {
  return (
    <Menu className={`main-menu ${className}`} mode="horizontal">
      {items?.map((item, i) => {
        if (item?.elements) {
          return (
            <SubMenu key={`item-${i}`} title={item.title}>
              {item.elements.map((item, j) => (
                <MenuItem key={`sub-${{ j }}`} link={item} />
              ))}
            </SubMenu>
          )
        }
        return <MenuItem key={`item-${i}`} link={item} />
      })}
      {addOnItems && addOnItems.map((item) => item)}
    </Menu>
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
