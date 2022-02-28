require('./styles.less')
import { Button } from 'antd'
import { motion, useTransform, useViewportScroll } from 'framer-motion'
import React, { useState } from 'react'

import { useActiveAction, useIsMobile } from '../../../hooks/useIsClient'

const SCROLL_RANGE = [0, 200]

export const Header = (props) => {
  const [open, setOpen] = useState(false)
  const { scrollY } = useViewportScroll()
  const contentWidth = useTransform(scrollY, SCROLL_RANGE, [0, 375])
  const opacity = useTransform(scrollY, [0, 60], [1, 0])
  const headerWidth = useTransform(scrollY, SCROLL_RANGE, ['100%', '16%'])
  const padding = useTransform(scrollY, SCROLL_RANGE, ['20px', '0px'])
  const isMobile = useIsMobile()
  const { activeAction } = useActiveAction()

  const toggleMenu = () => {
    setOpen(!open)
  }

  const scroll = (name) => {
    const section = document.querySelector(`#${name}`)
    section?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <header className="header">
      <motion.div className="header-start" style={{ width: headerWidth }}>
        <motion.div className="logo" style={{ opacity, padding }}>
          <img src="/images/logo.svg" />
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
          {props.actions?.map((action) => (
            <li
              className={`action-element ${
                activeAction === action.id ? 'active' : ''
              }`}
              key={action.id}
            >
              <Button onClick={() => scroll(action.id)} smooth type="link">
                <div className="icon">
                  <img src={action.icon} />
                </div>
                <div className="text">{action.name}</div>
              </Button>
            </li>
          ))}
        </ul>

        <div className="header-bottom">More ideas?</div>
      </motion.div>
    </header>
  )
}
