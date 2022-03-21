import { ArrowLeftOutlined, ArrowRightOutlined } from '@ant-design/icons'
import { Button } from 'antd'
import classNames from 'classnames'
import React from 'react'

export const ArrowButton = ({ className, onClick, style }) => {
  const isPrev = className.indexOf('prev') > -1
  const icon = isPrev ? <ArrowLeftOutlined /> : <ArrowRightOutlined />
  return (
    <div className={classNames('slick-arrow-btn', className)} style={style}>
      <Button icon={icon} onClick={onClick} />
    </div>
  )
}
