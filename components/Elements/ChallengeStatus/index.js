require('./styles.less')

import { RocketFilled } from '@ant-design/icons'
import { Button } from 'antd'
import classNames from 'classnames'
import React from 'react'

import { useCustomization } from '../../../hooks'

export const ChallengeStatus = ({ className }) => {
  const customization = useCustomization()
  if (!customization.sender) return null
  return (
    <div className={classNames('challenge-status', className)}>
      <div className="status-icon">
        <RocketFilled />
      </div>
      <div className="invited-by">
        <label>Invited by</label>
        <div className="invited-by-text">{customization.sender}</div>
      </div>
      <Button type="primary">Invite</Button>
    </div>
  )
}
