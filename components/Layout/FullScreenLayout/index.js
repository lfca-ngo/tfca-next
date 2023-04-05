require('./styles.less')

import classNames from 'classnames'
import React from 'react'

import { Template } from '../Template'

export const FullScreenLayout = ({ children }) => {
  return (
    <Template className={classNames('fullscreen-layout')}>
      <main>{children}</main>
    </Template>
  )
}
