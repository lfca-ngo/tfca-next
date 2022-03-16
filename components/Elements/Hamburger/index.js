require('./styles.less')

import { Drawer } from 'antd'
import React, { useState } from 'react'

export const Hamburger = (props) => {
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
        closable={false}
        onClose={toggleMenu}
        placement="right"
        title={props.title}
        visible={open}
      >
        {props.content}
      </Drawer>
    </div>
  )
}
