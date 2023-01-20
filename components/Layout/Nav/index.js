require('./styles.less')

import classNames from 'classnames'
import React from 'react'

import { DefaultLogo, Hamburger } from '../../Elements'
import { MainMenu } from './MainMenu'

export const Nav = ({ className, mode, theme }) => {
  return (
    <nav className={classNames('nav', className, mode, theme)}>
      <div className="nav-container">
        <DefaultLogo isDarkMode={false} />
        <MainMenu className="hidden md-max" />
        <Hamburger content={<MainMenu mode="inline" />} mode={mode} />
      </div>
    </nav>
  )
}
