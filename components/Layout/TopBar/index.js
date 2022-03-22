require('./styles.less')

import { CloseOutlined } from '@ant-design/icons'
import { Button } from 'antd'
import classNames from 'classnames'
import React, { useState } from 'react'

import { useTopbar } from '../../../hooks'

export const TopBar = () => {
  const topbarContent = useTopbar()
  const [hidden, setHidden] = useState(false)

  if (!topbarContent.active) return null
  return (
    <div className={classNames('top-bar', { hidden })}>
      <div className="text">{topbarContent.text}</div>
      <Button className="no-padding" type="link">
        {topbarContent?.link?.title}
      </Button>
      <Button
        className="no-padding close-btn"
        icon={<CloseOutlined />}
        onClick={() => setHidden(true)}
        type="link"
      />
    </div>
  )
}
