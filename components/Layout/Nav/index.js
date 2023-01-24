require('./styles.less')

import classNames from 'classnames'
import React from 'react'

import { useIsMobile } from '../../../hooks'
import { DefaultLogo, Hamburger } from '../../Elements'
import { MainMenu } from '../MainMenu'

export const Nav = ({ className, company, mode, theme }) => {
  const isMobile = useIsMobile()

  return (
    <nav className={classNames('nav', className, mode, theme)}>
      <div className="nav-container">
        <DefaultLogo isMobile={isMobile} />
        <MainMenu className="hidden md-max" company={company} />
        <Hamburger content={<MainMenu mode="vertical" />} mode={mode} />
      </div>
    </nav>
  )
}
