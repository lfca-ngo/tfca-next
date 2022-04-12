require('./styles.less')

import { DownOutlined } from '@ant-design/icons'
import { Menu } from 'antd'
import classNames from 'classnames'
import React, { useState } from 'react'

import { DefaultLogo, Hamburger } from '../../Elements'
import { MenuItem } from './MenuItem'

const { SubMenu } = Menu

export const MainMenu = ({ addOnItems, className = '', items, mode }) => {
  const [openSubKeys, setOpenSubKeys] = useState([])
  return (
    <Menu
      className={`main-menu ${className}`}
      mode={mode || 'horizontal'}
      onOpenChange={(keys) => setOpenSubKeys(keys)}
      selectedKeys={[]}
    >
      {items?.map((item, i) => {
        const itemKey = `item-${i}`
        const isOpen = openSubKeys.includes(itemKey)
        if (item?.elements) {
          return (
            <SubMenu
              key={itemKey}
              title={
                <span>
                  {item.title}
                  <DownOutlined
                    className={classNames('submenu-icon', { open: isOpen })}
                  />
                </span>
              }
            >
              {item.elements.map((item, j) => (
                <MenuItem key={`sub-${j}`} link={item} />
              ))}
            </SubMenu>
          )
        }
        return <MenuItem key={itemKey} link={item} />
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
          content={
            <MainMenu
              addOnItems={addOnItems}
              items={menuItems}
              mode="vertical"
            />
          }
          mode={mode}
        />
      </div>
    </nav>
  )
}
