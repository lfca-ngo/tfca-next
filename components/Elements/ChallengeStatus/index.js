require('./styles.less')

import { RocketFilled } from '@ant-design/icons'
import { Button, Drawer } from 'antd'
import classNames from 'classnames'
import React, { useState } from 'react'

import { useContentBlocks, useCustomization } from '../../../hooks'
import { textBlockToString } from '../../../utils'
import { InviteDialog } from '../InviteDialog'

export const ChallengeStatus = ({
  buttonOnlyLabel,
  buttonOnlyProps,
  className,
  renderButtonOnly,
}) => {
  const [open, setOpen] = useState(false)
  const customization = useCustomization()

  const invitedByLabel = textBlockToString(
    useContentBlocks('challenge.status.invite.label')
  )
  const inviteLabel1 = textBlockToString(
    useContentBlocks('challenge.status.label1')
  )
  const inviteLabel2 = textBlockToString(
    useContentBlocks('challenge.status.label2')
  )
  const buttonLabel = textBlockToString(
    useContentBlocks('challenge.status.button')
  )

  const Trigger = renderButtonOnly ? (
    <Button onClick={() => setOpen(true)} {...buttonOnlyProps}>
      {buttonOnlyLabel}
    </Button>
  ) : (
    <div className={classNames('challenge-status', className)}>
      <div className="status-icon">
        <RocketFilled />
      </div>
      <div className="invited-by">
        {customization?.sender ? (
          <>
            <label>{invitedByLabel} </label>
            <div className="invited-by-text">{customization.sender}</div>
          </>
        ) : (
          <>
            <label>{inviteLabel1}</label>
            <div className="invited-by-text">{inviteLabel2}</div>
          </>
        )}
      </div>
      <Button
        data-testid="challenge-status-invite-btn"
        onClick={() => setOpen(true)}
        type="primary"
      >
        {buttonLabel}
      </Button>
    </div>
  )

  return (
    <>
      {Trigger}
      <Drawer
        className={`drawer-md`}
        onClose={() => setOpen(!open)}
        visible={open}
      >
        <InviteDialog
          imageInviteColor={'lila'}
          imageInviteText={'I took action|for a brighter|tomorrow'}
          otherUsers={1000}
        />
      </Drawer>
    </>
  )
}
