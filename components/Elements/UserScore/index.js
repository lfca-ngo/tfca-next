require('./styles.less')

import {
  CheckCircleOutlined,
  CopyOutlined,
  ForkOutlined,
  HistoryOutlined,
  InfoCircleOutlined,
  LikeOutlined,
  LoginOutlined,
  SendOutlined,
  UsergroupAddOutlined,
} from '@ant-design/icons'
import { Badge, Button, Drawer, List, message, Space, Tooltip } from 'antd'
import React, { useState } from 'react'
import CopyToClipboard from 'react-copy-to-clipboard'

import {
  useContentBlocks,
  useCustomization,
  useLogin,
  useUser,
} from '../../../hooks'
import { textBlockToString } from '../../../utils'
import { Text } from '../Text'

const SCORE_PLACEHOLDER = '-'

export const UserScore = () => {
  const [helpVisible, setHelpVisible] = useState(false)
  const customization = useCustomization()
  const { isLoading, isServerUser, refetchUserScore, user, userId, userScore } =
    useUser()
  const { setLoginVisible } = useLogin()

  // strings
  const joinTitle = textBlockToString(useContentBlocks('score.join.title'))
  const howitworksTitle = textBlockToString(
    useContentBlocks('score.howitworks.title')
  )
  const nickname = textBlockToString(useContentBlocks('score.nickname'))
  const nicknamePopover = textBlockToString(
    useContentBlocks('score.nickname.popover')
  )
  const loginkey = textBlockToString(useContentBlocks('score.loginkey'))
  const loginkeyPopover = textBlockToString(
    useContentBlocks('score.loginkey.popover')
  )
  const acceptedInvites = textBlockToString(
    useContentBlocks('score.accepted.invites')
  )
  const team = textBlockToString(useContentBlocks('score.team'))
  const triggeredActions = textBlockToString(
    useContentBlocks('score.triggered.actions')
  )
  const invites = textBlockToString(useContentBlocks('score.invites'))
  const invitedBy = textBlockToString(useContentBlocks('score.invited.by'))
  const buttonRefresh = textBlockToString(
    useContentBlocks('score.refresh.button')
  )
  // content of the help drawer
  const helpContent = useContentBlocks('score.howitworks.content')

  const refetch = async (e) => {
    e.preventDefault()
    refetchUserScore()
  }

  return (
    <div className="user-score">
      <Space direction="vertical" style={{ width: '100%' }}>
        <List className="full-width-items" loading={isLoading} size="small">
          <List.Item
            actions={[
              <Button
                className="size-xs"
                key="how"
                onClick={() => setHelpVisible(true)}
                size="small"
                type="link"
              >
                {howitworksTitle}
              </Button>,
            ]}
            className="heading"
          >
            {joinTitle}
          </List.Item>
          <List.Item actions={[<>{user?.userName || SCORE_PLACEHOLDER}</>]}>
            <Tooltip overlayClassName="tooltip-xs" title={nicknamePopover}>
              <InfoCircleOutlined className="title-icon" />
              {nickname}
            </Tooltip>
          </List.Item>
          <List.Item
            actions={[
              <>
                {isServerUser ? (
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
                ) : (
                  <Button
                    className="size-xs"
                    onClick={() => setLoginVisible(true)}
                    size="small"
                    type="primary"
                  >
                    Login
                  </Button>
                )}
              </>,
            ]}
          >
            <Tooltip overlayClassName="tooltip-xs" title={loginkeyPopover}>
              <LoginOutlined className="title-icon" />
              {loginkey}
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
            {acceptedInvites}
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
            {triggeredActions}
          </List.Item>
          <List.Item
            actions={[
              <Badge
                className="score-badge"
                count={userScore?.invitesCount.toFixed(1) || 0}
                key="invites"
                showZero
              />,
            ]}
          >
            <UsergroupAddOutlined className="title-icon" />
            {invites}
          </List.Item>
          {customization?.senderName ? (
            <List.Item actions={[<>{customization?.senderName}</>]}>
              <SendOutlined className="title-icon" />
              {invitedBy}
            </List.Item>
          ) : null}

          {user?.teamId ? (
            <List.Item actions={[<>{user?.teamId}</>]}>
              <ForkOutlined className="title-icon" />
              {team}
            </List.Item>
          ) : null}
        </List>

        <Button block icon={<HistoryOutlined />} onClick={refetch} size="small">
          {buttonRefresh}
        </Button>
      </Space>

      {/* Drawer with info text */}
      <Drawer
        className="drawer-md"
        onClose={() => setHelpVisible(false)}
        visible={helpVisible}
      >
        <Text block={helpContent} />
      </Drawer>
    </div>
  )
}
