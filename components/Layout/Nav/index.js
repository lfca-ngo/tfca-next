require('./styles.less')
import React from 'react'

export const Nav = (props) => {
  return (
    <nav className={`${props.className} nav`}>
      <ul>
        <li>Item</li>
        <li>Item</li>
        <li>Item</li>
        <li>Item</li>
      </ul>
    </nav>
  )
}
