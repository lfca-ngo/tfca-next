import { CopyOutlined, HistoryOutlined } from '@ant-design/icons'
import { Badge, Button, List, message, Space } from 'antd'
import React from 'react'
import CopyToClipboard from 'react-copy-to-clipboard'

import { useCustomization, useUserId } from '../../../hooks'
import { useUserScore } from '../../../services/internal/userscore'

export const UserScore = () => {
  const customization = useCustomization()
  const userId = useUserId()
  const {
    data,
    isLoading,
    refetch: refetchUserScore,
  } = useUserScore(userId, {
    enabled: false,
  })
  const user = data?.user
  const userScore = data?.userScore

  const refetch = (e) => {
    e.preventDefault()
    refetchUserScore()
  }
  const SCORE_PLACEHOLDER = '-'

  return (
    <div className="user-score">
      <Space direction="vertical" style={{ width: '100%' }}>
        <List className="full-width-items" loading={isLoading} size="small">
          <List.Item
            actions={[<>{user?.name ? user?.name : SCORE_PLACEHOLDER}</>]}
          >
            Name
          </List.Item>
          <List.Item
            actions={[
              <>
                {user?.userId ? (
                  <CopyToClipboard
                    onCopy={() => {
                      message.success('Copied your unique login key')
                    }}
                    text={userId}
                  >
                    <Button
                      block
                      className="size-xs"
                      icon={<CopyOutlined />}
                      size="small"
                      type="primary"
                    >
                      Copy
                    </Button>
                  </CopyToClipboard>
                ) : (
                  SCORE_PLACEHOLDER
                )}
              </>,
            ]}
          >
            Login Key
          </List.Item>
          <List.Item
            actions={[
              <>
                {userScore?.acceptedInvitesCount ? (
                  <Badge
                    className="score-badge"
                    count={userScore?.acceptedInvitesCount}
                  />
                ) : (
                  SCORE_PLACEHOLDER
                )}
              </>,
            ]}
          >
            Accepted Invites
          </List.Item>
          <List.Item
            actions={[
              <>
                {userScore?.triggeredActionsCount ? (
                  <Badge
                    className="score-badge"
                    count={userScore?.triggeredActionsCount}
                  />
                ) : (
                  SCORE_PLACEHOLDER
                )}
              </>,
            ]}
          >
            Triggered Actions
          </List.Item>
          <List.Item
            actions={[
              <>
                {userScore?.invitesCount ? (
                  <Badge
                    className="score-badge"
                    count={userScore?.invitesCount}
                  />
                ) : (
                  SCORE_PLACEHOLDER
                )}
              </>,
            ]}
          >
            Invites
          </List.Item>
          <List.Item
            actions={[
              <>
                {customization?.senderName
                  ? customization?.senderName
                  : SCORE_PLACEHOLDER}
              </>,
            ]}
          >
            Invited by:
          </List.Item>
        </List>

        <Button block icon={<HistoryOutlined />} onClick={refetch} size="small">
          Refresh data
        </Button>
      </Space>
    </div>
  )
}
