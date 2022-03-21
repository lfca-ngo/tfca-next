require('./styles.less')

import { Spin } from 'antd'
import React from 'react'

export const ComponentPlaceholder = () => {
  return (
    <div className="component-placeholder">
      <Spin />
    </div>
  )
}
