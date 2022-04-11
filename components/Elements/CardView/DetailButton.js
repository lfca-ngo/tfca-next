require('./detailButton.less')

import { ArrowRightOutlined } from '@ant-design/icons'
import { Button } from 'antd'
import React from 'react'

export const DetailButton = ({ onClick, text }) => {
  return (
    <Button className="no-padding detail-button" onClick={onClick} type="link">
      {text}
      <ArrowRightOutlined />
    </Button>
  )
}
