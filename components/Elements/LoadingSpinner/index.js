require('./styles.less')
import { LoadingOutlined } from '@ant-design/icons'
import { Spin } from 'antd'
import React from 'react'

export const spinnerProps = (spinning = true) => ({
  indicator: <LoadingOutlined />,
  spinning: spinning,
  wrapperClassName: 'loading-wrapper',
})

export const LoadingSpinner = () => {
  return (
    <div className="loading-wrapper centered">
      <Spin {...spinnerProps()} />
    </div>
  )
}
