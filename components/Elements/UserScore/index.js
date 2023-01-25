import { HistoryOutlined } from '@ant-design/icons'
import { Button } from 'antd'
import React from 'react'

import { useCustomization, useUserId } from '../../../hooks'
import { useUserScore } from '../../../services/internal/userscore'

export const UserScore = () => {
  const customization = useCustomization()
  const userId = useUserId()
  const { data, refetch: refetchUserScore } = useUserScore(userId, {
    enabled: false,
  })
  const user = data?.user
  const userScore = data?.userScore

  const refetch = () => {
    refetchUserScore()
  }

  return (
    <div className="user-score">
      {user?.name && <div>Name: {user?.name}</div>}
      {user?.userId && <div>uid: {user?.userId}</div>}
      {userScore?.acceptedInvitesCount && (
        <div>Accepted Invites: {userScore?.acceptedInvitesCount}</div>
      )}
      {userScore?.triggeredActionsCount && (
        <div>Triggered Actions: {userScore?.triggeredActionsCount}</div>
      )}
      {userScore?.invitesCount && <div>Invites: {userScore?.invitesCount}</div>}
      {customization?.senderName && (
        <div>Invited by: {customization?.senderName}</div>
      )}
      <Button icon={<HistoryOutlined />} onClick={refetch} size="small" />
    </div>
  )
}
