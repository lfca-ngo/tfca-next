require('./styles.less')
import { LoadingOutlined } from '@ant-design/icons'
import { Spin } from 'antd'
import classNames from 'classnames'
import React from 'react'

export const spinnerProps = (spinning = true) => ({
  indicator: <LoadingOutlined />,
  spinning: spinning,
  wrapperClassName: 'loading-wrapper',
})

export const LoadingSpinner = ({ className, label }) => {
  return (
    <div className={classNames('loading-wrapper', 'centered', className)}>
      <Spin {...spinnerProps()} />
      {label && <p className="label">{label}</p>}
    </div>
  )
}
