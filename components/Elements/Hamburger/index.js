require('./styles.less')

import { Drawer } from 'antd'
import React, { useState } from 'react'

export const Hamburger = ({ content, title }) => {
  const [open, setOpen] = useState(false)

  const toggleMenu = () => {
    setOpen(!open)
  }

  return (
    <div>
      <button
        className={`hamburger hamburger--spin ${open && 'is-active'}`}
        onClick={toggleMenu}
        type="button"
      >
        <span className="hamburger-box">
          <span className="hamburger-inner" />
        </span>
      </button>

      <Drawer
        className="hamburger-drawer"
        onClose={toggleMenu}
        placement="right"
        title={title}
        visible={open}
      >
        {content}
      </Drawer>
    </div>
  )
}
