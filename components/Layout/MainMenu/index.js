require('./styles.less')

import { ForkOutlined, UserOutlined } from '@ant-design/icons'
import { Avatar } from 'antd'
import classNames from 'classnames'
import { useRouter } from 'next/router'
import React from 'react'

import { useContentBlocks } from '../../../hooks'
import { textBlockToString } from '../../../utils'
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

  // menu items
  const menuAbout = textBlockToString(useContentBlocks('menu.item.about'))
  const menuLeaderboard = textBlockToString(
    useContentBlocks('menu.item.leaderboard')
  )
  const menuAboutCampaign = textBlockToString(
    useContentBlocks('menu.item.about.campaign')
  )
  const menuAboutAboutUs = textBlockToString(
    useContentBlocks('menu.item.about.aboutus')
  )
  const menuAboutParticipants = textBlockToString(
    useContentBlocks('menu.item.about.participants')
  )
  const menuAboutQuestions = textBlockToString(
    useContentBlocks('menu.item.about.questions')
  )
  const menuTeam = textBlockToString(useContentBlocks('menu.item.team'))
  const menuYou = textBlockToString(useContentBlocks('menu.item.you'))

  return (
    <ul className={classNames(`main-menu`, className, mode)}>
      {company && <CompanyMenuItem company={company} key="company" />}
      <MenuItem
        showCaret
        submenuItems={[
          <MenuItem
            key="campaign"
            slug="/cms/about"
            title={menuAboutCampaign}
          />,
          <MenuItem
            key="about"
            slug="/cms/about-us"
            title={menuAboutAboutUs}
          />,
          <MenuItem
            key="overview"
            slug="/cms/overview"
            title={menuAboutParticipants}
          />,
          <QuestionsMenuItem key="questions" title={menuAboutQuestions} />,
        ]}
        title={menuAbout}
      />
      {team && (
        <MenuItem
          icon={<Avatar icon={<ForkOutlined />} shape="square" />}
          submenuItems={[
            <MenuItem
              key="leaderboard"
              slug={`/teams/${team}`}
              title={menuLeaderboard}
            />,
          ]}
          title={menuTeam}
        />
      )}
      <MenuItem
        icon={<Avatar icon={<UserOutlined />} shape="square" />}
        submenuItems={[<UserScore key="score" />]}
        title={menuYou}
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
