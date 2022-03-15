import { Tag } from 'antd'
import React from 'react'

const ActionCounter = () => {
  return (
    <small className="action-counter">
      Mehr als <Tag>props.count</Tag> haben das bereits gemacht
    </small>
  )
}

export default ActionCounter
