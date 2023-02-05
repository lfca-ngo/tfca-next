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
import { useRouter } from 'next/router'
import React, { useState } from 'react'
import CopyToClipboard from 'react-copy-to-clipboard'

import { useCustomization, useLogin, useUserId } from '../../../hooks'
import { useUserScore } from '../../../services/internal/userscore'

export const UserScore = () => {
  const [helpVisible, setHelpVisible] = useState(false)
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
          <List.Item
            actions={[
              <Button
                className="size-xs"
                key="how"
                onClick={() => setHelpVisible(true)}
                size="small"
                type="link"
              >
                How it works
              </Button>,
            ]}
            className="heading"
          >
            Join the game
          </List.Item>
          <List.Item actions={[<>{userName}</>]}>
            <Tooltip
              overlayClassName="tooltip-xs"
              title="Invite friends to set a nickname"
            >
              <InfoCircleOutlined className="title-icon" />
              Nickname
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
              <SendOutlined className="title-icon" />
              Invited by
            </List.Item>
          ) : null}

          {teamId ? (
            <List.Item actions={[<>{teamId}</>]}>
              <ForkOutlined className="title-icon" />
              Team
            </List.Item>
          ) : null}
        </List>

        <Button block icon={<HistoryOutlined />} onClick={refetch} size="small">
          Refresh data
        </Button>
      </Space>

      {/* Drawer with info text */}
      <Drawer
        className="drawer-md"
        onClose={() => setHelpVisible(false)}
        visible={helpVisible}
      >
        <h3>How it works</h3>
        <p>
          Help us to spread the word about this campaign by inviting friends,
          family or colleagues. You can create personal invites after completing
          an action or by opening the share dialog.
        </p>
        <h5>Concerned about privacy?</h5>
        <p>
          {`We don't just care about the planet, we also care about your privacy.`}
          <strong>
            {`We don't use Google Analytics or any other privacy unfriendly
            tracking solution. The game data is not shared with any third
            parties.`}
          </strong>
        </p>
        <p>
          When you decide to invite others, you can personalize invites by
          adding your nickname and your invitees names. Please use only first
          names or nicknames so that the data cannot be used to identify you.
        </p>
        <h5>Cookies?</h5>
        <p>
          {`When you select "Allow" on the cookie popup, we save a randomly
          generated id as a cookie in your browser. This allows you to continue
          "playing" from this browser even after closing it.`}
        </p>
        <p>
          If you deny cookies, you can still invite others and even access your
          game data after closing the browser. BUT, in order to do that you need
          to copy your Login Key and store in somewhere safe.
        </p>
      </Drawer>
    </div>
  )
}
