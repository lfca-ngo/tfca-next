require('./styles.less')

import { ForkOutlined, UserOutlined } from '@ant-design/icons'
import { Avatar } from 'antd'
import classNames from 'classnames'
import { useRouter } from 'next/router'
import React from 'react'

import { ChallengeStatus } from '../../Elements'
import { UserScore } from '../../Elements/UserScore'
import { IntlSelector } from '../../IntlSelector'
import { TimeCounter } from '../../TimeCounter'
import { CompanyMenuItem } from './CompanyMenuItem'
import { MenuItem } from './MenuItem'
import { QuestionsMenuItem } from './QuestionsMenuItem'

export const MainMenu = ({ className = '', company, mode }) => {
  const { query } = useRouter()
  const team = query?.teamId

  return (
    <ul className={classNames(`main-menu`, className, mode)}>
      {company && <CompanyMenuItem company={company} key="company" />}
      <MenuItem
        showCaret
        submenuItems={[
          <MenuItem key="campaign" slug="/cms/about" title="The Campagin" />,
          <MenuItem key="about" slug="/cms/about-us" title="About us" />,
          <MenuItem key="overview" slug="/cms/overview" title="Participants" />,
          <QuestionsMenuItem key="questions" title="Questions?" />,
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
        submenuItems={[<UserScore key="score" />]}
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
