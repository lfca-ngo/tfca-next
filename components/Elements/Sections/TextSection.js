import { PlusCircleOutlined } from '@ant-design/icons'
import React from 'react'

import { Text } from '../Text'

export const TextSection = ({ text, title, titleIcon }) => {
  return (
    <div className="text-section">
      <div className="section-title title">
        {titleIcon || <PlusCircleOutlined />}
        {title}
      </div>
      <Text block={text} />
    </div>
  )
}
