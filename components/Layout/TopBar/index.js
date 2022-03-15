require('./styles.less')

import { CloseOutlined } from '@ant-design/icons'
import { Button } from 'antd'
import classNames from 'classnames'
import React, { useState } from 'react'

export const TopBar = () => {
  const [hidden, setHidden] = useState(false)
  return (
    <div className={classNames('top-bar', { hidden })}>
      <div className="text">{`It's Time for Climate Action`}</div>
      <Button className="no-padding" type="link">
        Take #5minForThePlanet
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
