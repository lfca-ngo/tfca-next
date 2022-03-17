require('./styles.less')
import React from 'react'

export const DefaultHero = ({ subtitle, title }) => {
  return (
    <header className="default-hero">
      <h1>{title}</h1>
      <h2>{subtitle}</h2>
    </header>
  )
}
