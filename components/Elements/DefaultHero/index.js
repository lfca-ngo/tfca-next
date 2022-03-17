require('./styles.less')
import classNames from 'classnames'
import React from 'react'

export const DefaultHero = ({ style, subtitle, title }) => {
  return (
    <header className={classNames('default-hero', style)}>
      <div className="text-wrapper">
        <h1>{title}</h1>
        <h2>{subtitle}</h2>
      </div>
    </header>
  )
}
