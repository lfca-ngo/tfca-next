import { Tag } from 'antd'
import React from 'react'

const ActionCounter = (props) => {
  // const { isMobile } = useIsMobile()

  const timeAnimation = useSpring({
    from: { number: 0 },
    number: props.isFocus ? props.count : 0,
  })

  return (
    <small className="action-counter">
      Mehr als <Tag>props.count</Tag> haben das bereits gemacht
    </small>
  )
}

export default ActionCounter
