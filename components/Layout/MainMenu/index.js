require('./styles.less')

import { CopyOutlined, ForkOutlined, UserOutlined } from '@ant-design/icons'
import { Avatar, Button, message } from 'antd'
import classNames from 'classnames'
import { useRouter } from 'next/router'
import React from 'react'
import { CopyToClipboard } from 'react-copy-to-clipboard'

import { useCustomization, useUserId } from '../../../hooks'
import { ChallengeStatus } from '../../Elements'
import { IntlSelector } from '../../IntlSelector'
import { TimeCounter } from '../../TimeCounter'
import { CompanyMenuItem } from './CompanyMenuItem'
import { MenuItem } from './MenuItem'

export const MainMenu = ({ className = '', company, mode }) => {
  const { query } = useRouter()
  const team = query.team
  const customization = useCustomization()
  const userId = useUserId()

  return (
    <ul className={classNames(`main-menu`, className, mode)}>
      {company && <CompanyMenuItem company={company} key="company" />}

      <MenuItem
        showCaret
        submenuItems={[
          <MenuItem key="campaign" slug="/cms/about" title="The Campagin" />,
          <MenuItem key="about" slug="/cms/about-us" title="About us" />,
          <MenuItem key="overview" slug="/cms/overview" title="Participants" />,
        ]}
        title={'About'}
      />
      {team && (
        <MenuItem
          icon={<Avatar icon={<ForkOutlined />} shape="square" />}
          submenuItems={[
            <MenuItem
              key="leaderboard"
              slug={`/teams/${team}`}
              title="Leaderboard"
            />,
          ]}
          title="Team"
        />
      )}
      <MenuItem
        icon={<Avatar icon={<UserOutlined />} shape="square" />}
        submenuItems={[
          <MenuItem
            key="invited-by"
            title={`Invited by: ${customization?.senderName || '-'}`}
          />,
          <MenuItem key="name" title={`Name: ${customization?.name || '-'}`} />,
          <MenuItem
            key="login"
            title={
              <CopyToClipboard
                onCopy={() => {
                  message.success('Copied value')
                }}
                text={`https://tfca.earth?login=${userId}`}
              >
                <Button
                  block
                  icon={<CopyOutlined />}
                  size="small"
                  type="primary"
                >
                  Copy Login-Link
                </Button>
              </CopyToClipboard>
            }
          />,
        ]}
        title="You"
      />
      <MenuItem className="padding-small" title={<TimeCounter />} />
      <MenuItem
        className="padding-small"
        title={
          <ChallengeStatus
            buttonOnlyLabel="Share"
            buttonOnlyProps={{ size: 'small', type: 'primary' }}
            renderButtonOnly
          />
        }
      />
      <MenuItem className="padding-small" title={<IntlSelector />} />
    </ul>
  )
}
