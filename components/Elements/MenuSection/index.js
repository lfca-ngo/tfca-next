require('./styles.less')

import React from 'react'

export const MenuSection = ({ content, title }) => {
  return (
    <div className="menu-section">
      <h3>{title}</h3>
      <div>{content}</div>
    </div>
  )
}
