require('./styles.less')
import { LoadingOutlined } from '@ant-design/icons'
import React from 'react'

const LoadingSpinner = () => {
  return <LoadingOutlined />
}

export const spinnerProps = (spinning) => ({
  indicator: <LoadingSpinner />,
  spinning: spinning,
  wrapperClassName: 'loading-wrapper',
})
