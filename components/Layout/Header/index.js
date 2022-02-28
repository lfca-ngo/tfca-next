require('./styles.less')
import { Button } from 'antd'
import { motion, useTransform, useViewportScroll } from 'framer-motion'
import React, { useState } from 'react'

import { useActiveAction } from '../../../hooks/useIsClient'

const SCROLL_RANGE = [0, 200]
const SCROLL_RANGE_SHORT = [0, 60]

export const Header = (props) => {
  const [open, setOpen] = useState(false)
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

  const { activeAction } = useActiveAction()

  const toggleMenu = () => {
    setOpen(!open)
  }

  const scroll = (name) => {
    const section = document.querySelector(`#${name}`)
    section?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <motion.header className="header" style={{ boxShadow }}>
      <motion.div className="header-start" style={{ width: headerWidth }}>
        <motion.div className="logo" style={{ opacity, padding: logoPadding }}>
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

      <motion.div className="header-content" style={{ width: contentWidth }}>
        <ul>
          {props.actions?.map((action) => (
            <li
              className={`action-element ${
                activeAction === action.id ? 'active' : ''
              }`}
              key={action.id}
            >
              <Button onClick={() => scroll(action.id)} type="link">
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
    </motion.header>
  )
}
