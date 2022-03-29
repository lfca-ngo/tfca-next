require('./styles.less')

import { Spin } from 'antd'
import React from 'react'

export const Spinner = () => {
  return (
    <div className="spinner">
      <Spin />
    </div>
  )
}
