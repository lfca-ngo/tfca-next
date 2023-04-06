require('./styles.less')

import {
  CheckCircleOutlined,
  CopyOutlined,
  ForkOutlined,
  HistoryOutlined,
  InfoCircleOutlined,
  LikeOutlined,
  LoginOutlined,
  LogoutOutlined,
  RocketOutlined,
  SendOutlined,
  UsergroupAddOutlined,
} from '@ant-design/icons'
import {
  Badge,
  Button,
  Col,
  Drawer,
  List,
  message,
  Row,
  Space,
  Tooltip,
} from 'antd'
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
  const {
    completedActionsCount,
    isLoading,
    isLoggedIn,
    logout,
    refetchUserScore,
    user,
    userId,
    userScore,
  } = useUser()
  const { setLoginVisible } = useLogin()

  // strings
  const joinTitle = textBlockToString(useContentBlocks('score.join.title'))
  const howitworksTitle = textBlockToString(
    useContentBlocks('score.howitworks.title')
  )
  const menuInvitesHint = textBlockToString(
    useContentBlocks('menu.score.accepted.hint')
  )
  const menuAcceptedInvitesHint = textBlockToString(
    useContentBlocks('menu.score.accepted.hint')
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
                {isLoggedIn ? (
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
                count={completedActionsCount || 0}
                key="accepted"
                showZero
              />,
            ]}
          >
            <Tooltip
              overlayClassName="tooltip-xs"
              title={menuAcceptedInvitesHint}
            >
              <RocketOutlined className="title-icon" />
              Completed actions
            </Tooltip>
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
            <Tooltip overlayClassName="tooltip-xs" title={menuInvitesHint}>
              <UsergroupAddOutlined className="title-icon" />
              {invites}
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
            <Tooltip
              overlayClassName="tooltip-xs"
              title={menuAcceptedInvitesHint}
            >
              <CheckCircleOutlined className="title-icon" />
              {acceptedInvites}
            </Tooltip>
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

        <Row gutter={12}>
          {isLoggedIn ? (
            <>
              <Col span={12}>
                <Button
                  block
                  icon={<HistoryOutlined />}
                  onClick={refetch}
                  size="small"
                >
                  Refresh
                </Button>
              </Col>
              <Col span={12}>
                <Button
                  block
                  icon={<LogoutOutlined />}
                  onClick={logout}
                  size="small"
                  type="primary"
                >
                  Logout
                </Button>
              </Col>
            </>
          ) : (
            <Col span={24}>
              <Button
                block
                icon={<LoginOutlined />}
                onClick={() => setLoginVisible(true)}
                size="small"
                type="primary"
              >
                Login
              </Button>
            </Col>
          )}
        </Row>
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
