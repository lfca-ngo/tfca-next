require('./styles.less')

import { Tag } from 'antd'
import classNames from 'classnames'
import React from 'react'

import { useTopbar } from '../../../hooks'

export const TopBar = () => {
  const topbarContent = useTopbar()

  if (!topbarContent.active) return null
  return (
    <div className={classNames('top-bar')}>
      <Tag className="hero-tag">
        <div className="text hidden md-max">{topbarContent.text}</div>
        <div className="text hidden md">{topbarContent.mobileText}</div>
      </Tag>
    </div>
  )
}
