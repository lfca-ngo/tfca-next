require('./styles.less')

import {
  CheckCircleOutlined,
  CopyOutlined,
  HistoryOutlined,
  InfoCircleOutlined,
  LikeOutlined,
  LoginOutlined,
  UsergroupAddOutlined,
} from '@ant-design/icons'
import { Badge, Button, List, message, Space, Tooltip } from 'antd'
import { useRouter } from 'next/router'
import React from 'react'
import CopyToClipboard from 'react-copy-to-clipboard'

import { useCustomization, useLogin, useUserId } from '../../../hooks'
import { useUserScore } from '../../../services/internal/userscore'

export const UserScore = () => {
  const { query } = useRouter()
  const customization = useCustomization()
  const userId = useUserId()
  const { setLoginVisible } = useLogin()

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

  // the users name can come from the link -> customization,
  // but can be overwritten by db entry
  const userName =
    customization?.invitedUserName || user?.name || SCORE_PLACEHOLDER
  // the teamId can be given via param
  // but can be overwritten by db entry
  const teamId = query?.team || user?.teamId

  return (
    <div className="user-score">
      <Space direction="vertical" style={{ width: '100%' }}>
        <List className="full-width-items" loading={isLoading} size="small">
          <List.Item actions={[<>{userName}</>]}>
            <Tooltip
              overlayClassName="tooltip-xs"
              title="Invite friends to set a name"
            >
              <InfoCircleOutlined className="title-icon" />
              Name
            </Tooltip>
          </List.Item>
          <List.Item
            actions={[
              <>
                <CopyToClipboard
                  onCopy={() => {
                    message.success('Copied your unique login key')
                  }}
                  text={userId}
                >
                  <Tooltip title={userId}>
                    <Button
                      className="size-xs"
                      icon={<CopyOutlined />}
                      size="small"
                      type="primary"
                    >
                      Copy
                    </Button>
                  </Tooltip>
                </CopyToClipboard>
              </>,
            ]}
          >
            <Tooltip
              overlayClassName="tooltip-xs"
              title={
                <>
                  Save this key to play from another device.{' '}
                  <Button onClick={() => setLoginVisible(true)} type="link">
                    Want to login?
                  </Button>
                </>
              }
            >
              <LoginOutlined className="title-icon" />
              Login Key
            </Tooltip>
          </List.Item>
          <List.Item
            actions={[
              <Badge
                className="score-badge"
                count={userScore?.acceptedInvitesCount || 0}
                key="accepted"
                showZero
              />,
            ]}
          >
            <CheckCircleOutlined className="title-icon" />
            Accepted Invites
          </List.Item>
          <List.Item
            actions={[
              <Badge
                className="score-badge"
                count={userScore?.triggeredActionsCount || 0}
                key="triggered"
                showZero
              />,
            ]}
          >
            <LikeOutlined className="title-icon" />
            Triggered Actions
          </List.Item>
          <List.Item
            actions={[
              <Badge
                className="score-badge"
                count={userScore?.invitesCount || 0}
                key="invites"
                showZero
              />,
            ]}
          >
            <UsergroupAddOutlined className="title-icon" />
            Invites
          </List.Item>
          {customization?.senderName ? (
            <List.Item actions={[<>{customization?.senderName}</>]}>
              Invited by
            </List.Item>
          ) : null}

          {teamId ? (
            <List.Item actions={[<>{teamId}</>]}>Team</List.Item>
          ) : null}
        </List>

        <Button block icon={<HistoryOutlined />} onClick={refetch} size="small">
          Refresh data
        </Button>
      </Space>
    </div>
  )
}
