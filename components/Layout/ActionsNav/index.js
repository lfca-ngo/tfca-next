require('./styles.less')

import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons'
import { Button } from 'antd'
import classNames from 'classnames'
import { motion, useTransform, useViewportScroll } from 'framer-motion'
import Image from 'next/image'
import React from 'react'

import { useActiveAction, useIsClient, useIsMobile } from '../../../hooks'
import { getLogoSrc, scrollToId } from '../../../utils'
import { Hamburger } from '../../Elements'

const YELLOW = '#FDB766'
const LIGHT_WHITE = '#fdfaf5'
const MARGIN_LEFT_RANGE = [-75, 0]
const MARGIN_LEFT_EXPANDED_RANGE = [-240, 0]
const SCROLL_RANGE_LG = [0, 650]
const SCROLL_RANGE = [0, 400]
const SCROLL_RANGE_SHORT = [0, 60]
const CONTENT_WIDTH_RANGE = [0, 375]
const OPACITY_RANGE = [1, 0]
const HEADER_WIDTH_RANGE = ['100%', '16%']
const LOGO_PADDING_RANGE = ['20px', '0px']
const BOX_SHADOW_RANGE = [
  '0px 10px 10px rgba(0, 0, 0, 0.0)',
  '0px 10px 10px rgba(0, 0, 0, 0.05)',
]

export const ActionsNav = ({
  actions,
  collapsed,
  hamburgerMenu,
  setCollapsed,
}) => {
  const isMobile = useIsMobile()
  const isClient = useIsClient()
  const { scrollY } = useViewportScroll()

  const transitionBgColor = isMobile ? LIGHT_WHITE : LIGHT_WHITE
  const contentWidth = useTransform(scrollY, SCROLL_RANGE, CONTENT_WIDTH_RANGE)
  const opacity = useTransform(scrollY, SCROLL_RANGE_SHORT, OPACITY_RANGE)
  const headerWidth = useTransform(scrollY, SCROLL_RANGE, HEADER_WIDTH_RANGE)
  const logoPadding = useTransform(scrollY, SCROLL_RANGE, LOGO_PADDING_RANGE)
  const boxShadow = useTransform(scrollY, SCROLL_RANGE, BOX_SHADOW_RANGE)
  const marginLeft = useTransform(
    scrollY,
    SCROLL_RANGE_LG,
    collapsed ? MARGIN_LEFT_RANGE : MARGIN_LEFT_EXPANDED_RANGE
  )
  const backgroundColor = useTransform(scrollY, SCROLL_RANGE, [
    YELLOW,
    transitionBgColor,
  ])

  const logoStyles = isMobile ? { opacity, padding: logoPadding } : {}
  const headerStyles = isMobile
    ? { backgroundColor, boxShadow }
    : { boxShadow, marginLeft }
  const headerStartStyles = isMobile ? { width: headerWidth } : {}

  const { activeAction } = useActiveAction()

  return (
    <motion.header
      className={classNames('header', {
        collapsed,
        'dark-mode': isMobile,
        'is-client': isClient,
      })}
      key={`${isMobile}`}
      style={headerStyles}
    >
      <motion.div className="header-start" style={headerStartStyles}>
        <motion.div className="logo" style={logoStyles}>
          <Image height={48} src={'/images/logo_mobile.svg'} width={48} />
        </motion.div>

        <Hamburger content={hamburgerMenu} />
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
                data-testid={`actions-nav-${action.id}-btn`}
                onClick={() => scrollToId(action.id)}
                type="link"
              >
                <div className="icon">
                  <Image height={42} src={action.icon} width={42} />
                </div>
                <div className="text">{action.title}</div>
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
          </Button>
        </div>
      </motion.div>
    </motion.header>
  )
}
