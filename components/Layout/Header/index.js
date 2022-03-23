require('./styles.less')

import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons'
import { Button } from 'antd'
import classNames from 'classnames'
import { motion, useTransform, useViewportScroll } from 'framer-motion'
import Image from 'next/image'
import React from 'react'

import { useActiveAction, useDarkMode, useIsMobile } from '../../../hooks'
import { getLogoSrc, scrollToId } from '../../../utils'
import { Hamburger } from '../../Elements/Hamburger'
import { QuestionAnswer } from '../../Elements/QuestionAnswer'

const SCROLL_RANGE = [0, 400]
const SCROLL_RANGE_SHORT = [0, 60]
const CONTENT_WIDTH_RANGE = [0, 375]
const OPACITY_RANGE = [0, 1]
const HEADER_WIDTH_RANGE = ['100%', '16%']
const LOGO_PADDING_RANGE = ['20px', '0px']
const BOX_SHADOW_RANGE = [
  '0px 10px 10px rgba(0, 0, 0, 0.0)',
  '0px 10px 10px rgba(0, 0, 0, 0.05)',
]

export const Header = ({ actions, collapsed, setCollapsed }) => {
  const [isDarkMode] = useDarkMode()
  const isMobile = useIsMobile()
  const { scrollY } = useViewportScroll()

  // animations for mobile, the event does not fire on desktop
  const contentWidth = useTransform(scrollY, SCROLL_RANGE, CONTENT_WIDTH_RANGE)
  const opacity = useTransform(scrollY, SCROLL_RANGE_SHORT, OPACITY_RANGE)
  const headerWidth = useTransform(scrollY, SCROLL_RANGE, HEADER_WIDTH_RANGE)
  const logoPadding = useTransform(scrollY, SCROLL_RANGE, LOGO_PADDING_RANGE)
  const boxShadow = useTransform(scrollY, SCROLL_RANGE, BOX_SHADOW_RANGE)

  const logoStyles = isMobile ? { opacity, padding: logoPadding } : {}
  const logoSrc = getLogoSrc(isDarkMode)

  const { activeAction } = useActiveAction()

  return (
    <motion.header
      className={classNames('header', { collapsed })}
      style={{ boxShadow }}
    >
      <motion.div className="header-start" style={{ width: headerWidth }}>
        <motion.div className="logo" style={logoStyles}>
          <Image height={48} src={logoSrc} width={48} />
        </motion.div>

        <Hamburger content={<QuestionAnswer />} />
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
                onClick={() => scrollToId(action.id)}
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
