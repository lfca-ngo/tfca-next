require('./styles.less')

import { RocketFilled } from '@ant-design/icons'
import { Button, Drawer } from 'antd'
import classNames from 'classnames'
import React, { useState } from 'react'

import { useCustomization } from '../../../hooks'
import { Share } from '../../ActionModules/helpers/Share'

export const ChallengeStatus = ({ className, openGraphInfo }) => {
  const [open, setOpen] = useState(false)
  const customization = useCustomization()
  const isCustom = customization?.names?.length > 0

  return (
    <div className={classNames('challenge-status', className)}>
      <div className="status-icon">
        <RocketFilled />
      </div>
      <div className="invited-by">
        {isCustom ? (
          <>
            <label>Invited by</label>
            <div className="invited-by-text">{customization.sender}</div>
          </>
        ) : (
          <>
            <label>Invite</label>
            <div className="invited-by-text">friends</div>
          </>
        )}
      </div>
      <Button onClick={() => setOpen(true)} type="primary">
        Invite
      </Button>

      <Drawer
        className="drawer-md"
        onClose={() => setOpen(!open)}
        visible={open}
      >
        <Share
          // @TODO: @David to generate generic sharing link for user
          invites={[
            {
              names: [],
              ogImageUrl: openGraphInfo?.ogimage?.url,
              shortLink: '',
            },
          ]}
        />
      </Drawer>
    </div>
  )
}
