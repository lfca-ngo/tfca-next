require('./styles.less')

import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons'
import { Button } from 'antd'
import classNames from 'classnames'
import { motion, useTransform, useViewportScroll } from 'framer-motion'
import Image from 'next/image'
import React, { useState } from 'react'

import { useDarkMode } from '../../../hooks/useDarkMode'
import { useActiveAction, useIsMobile } from '../../../hooks/useIsClient'

const SCROLL_RANGE = [0, 200]
const SCROLL_RANGE_SHORT = [0, 60]

export const Header = ({ actions, collapsed, setCollapsed }) => {
  const [isDarkMode] = useDarkMode()
  const [open, setOpen] = useState(false)
  const isMobile = useIsMobile()
  // animations for mobile, the event does not fire on desktop
  const { scrollY } = useViewportScroll()
  const contentWidth = useTransform(scrollY, SCROLL_RANGE, [0, 375])
  const opacity = useTransform(scrollY, SCROLL_RANGE_SHORT, [1, 0])
  const headerWidth = useTransform(scrollY, SCROLL_RANGE, ['100%', '16%'])
  const logoPadding = useTransform(scrollY, SCROLL_RANGE, ['20px', '0px'])
  const boxShadow = useTransform(scrollY, SCROLL_RANGE, [
    '0px 10px 10px rgba(0, 0, 0, 0.0)',
    '0px 10px 10px rgba(0, 0, 0, 0.05)',
  ])

  const logoStyles = isMobile ? { opacity, padding: logoPadding } : {}
  const logoSrc = isDarkMode ? '/images/logo_darkmode.svg' : '/images/logo.svg'

  const { activeAction } = useActiveAction()

  const toggleMenu = () => {
    setOpen(!open)
  }

  const scroll = (name) => {
    const section = document.querySelector(`#${name}`)
    section?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <motion.header
      className={classNames('header', { collapsed })}
      style={{ boxShadow }}
    >
      <motion.div className="header-start" style={{ width: headerWidth }}>
        <motion.div className="logo" style={logoStyles}>
          <Image height={48} src={logoSrc} width={48} />
        </motion.div>
        <button
          className={`hamburger hamburger--spin ${open && 'is-active'}`}
          onClick={toggleMenu}
          type="button"
        >
          <span className="hamburger-box">
            <span className="hamburger-inner" />
          </span>
        </button>
      </motion.div>

      <motion.div
        className="header-content"
        style={{ width: isMobile ? contentWidth : 'auto' }}
      >
        <ul>
          {actions?.map((action) => (
            <li
              className={`action-element ${
                activeAction === action.id ? 'active' : ''
              }`}
              key={action.id}
            >
              <Button
                className="no-padding"
                onClick={() => scroll(action.id)}
                type="link"
              >
                <div className="icon">
                  <Image height={30} src={action.icon} width={30} />
                </div>
                <div className="text">{action.name}</div>
              </Button>
            </li>
          ))}
        </ul>

        <div className="header-bottom">
          <Button
            className="no-padding"
            onClick={() => setCollapsed(!collapsed)}
            type="link"
          >
            {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            {collapsed ? '' : 'Collapse'}
          </Button>
        </div>
      </motion.div>
    </motion.header>
  )
}
