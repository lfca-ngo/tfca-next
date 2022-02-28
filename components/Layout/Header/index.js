require('./styles.less')
import React, { useState } from 'react'
import { Element, Link, scroller, scrollSpy } from 'react-scroll'

export const Header = (props) => {
  const [open, setOpen] = useState(false)

  const toggleMenu = () => {
    setOpen(!open)
  }

  return (
    <header className="header">
      <div className="logo">
        <img src="/images/logo.svg" />
      </div>

      <button
        className={`hamburger hamburger--spin ${open && 'is-active'}`}
        onClick={toggleMenu}
        type="button"
      >
        <span className="hamburger-box">
          <span className="hamburger-inner" />
        </span>
      </button>

      <div className="header-content">
        <ul>
          {props.actions?.map((action) => (
            <li className="action-element" key={action.name}>
              <Link
                activeClass="active"
                containerId="scroll-container"
                smooth
                spy={true}
                to={action.name}
              >
                <div className="icon">
                  <img src={action.icon} />
                </div>
                <div className="text">{action.name}</div>
              </Link>
            </li>
          ))}
        </ul>

        <div className="header-bottom">More ideas?</div>
      </div>
    </header>
  )
}
