import {
  CheckOutlined,
  GlobalOutlined,
  HomeOutlined,
  PlusOutlined,
  ShareAltOutlined,
} from '@ant-design/icons'
import { Badge, List, Popover } from 'antd'
import React, { useMemo } from 'react'

import { Layout } from '../../components/Layout'
import { useIsMobile, useUser } from '../../hooks'
import { fetchAllStaticContent } from '../../services/contentful'
import { getAllTeams } from '../../services/firebase'
import { useTeamScores } from '../../services/internal/teamscores'

// Emoji list
const PLACES = ['🥇', '🥈', '🥉']

const DynamicTableColHeader = ({ title, icon = <HomeOutlined /> }) => {
  const isMobile = useIsMobile()

  if (!isMobile)
    return (
      <Popover
        content="Invites are valued at 0.1, accepted invites at 0.5"
        overlayClassName="popover-md"
      >
        {title}
      </Popover>
    )

  return <Popover content={title}>{icon}</Popover>
}

const SCORE_WEIGHTS = {
  acceptedInvitesCount: 0.5,
  completedActions: 1,
  invitesCount: 0.1,
  totalActionsTriggered: 1,
}

export default function LeaderBoard({ teamId = '' }) {
  const { data = [], isLoading } = useTeamScores(teamId)
  const { userId } = useUser()

  const team = teamId.charAt(0).toUpperCase() + teamId.slice(1)

  const sortedStats = useMemo(() => {
    return data
      .map((user) => ({
        ...user,
        acceptedInvitesCount:
          user.acceptedInvitesCount * SCORE_WEIGHTS.acceptedInvitesCount,
        completedActions:
          Object.keys(user.completedActions || {}).length *
          SCORE_WEIGHTS.completedActions,
        invitesCount: user.invitesCount * SCORE_WEIGHTS.invitesCount,
        isActive: user.userId === userId,
        totalActionsTriggered:
          user.totalActionsTriggered * SCORE_WEIGHTS.totalActionsTriggered,
      }))
      .sort((a, b) => {
        const sum = (a) =>
          a.totalActionsTriggered +
          a.invitesCount +
          a.acceptedInvitesCount +
          a.completedActions
        return sum(b) - sum(a)
      })
  }, [data, userId])

  return (
    <Layout
      subtitle={
        'Check how you are doing compared to your team. Who will win your teams challenge?!'
      }
      theme="color-1"
      title={
        <span>
          Team <strong>{team || ''}</strong>
        </span>
      }
    >
      <div className="list-table-header">
        <div className="table-col col-10 align-left" />
        <div className="table-col col-50 align-left">Nickname</div>
        <div className="table-col col-10">
          <DynamicTableColHeader
            icon={<PlusOutlined />}
            title={'Completed Actions'}
          />
        </div>
        <div className="table-col col-10">
          <DynamicTableColHeader
            icon={<ShareAltOutlined />}
            title={'Invited'}
          />
        </div>
        <div className="table-col col-10">
          <DynamicTableColHeader
            icon={<CheckOutlined />}
            title={'Accepted Invites'}
          />
        </div>
        <div className="table-col col-10">
          <DynamicTableColHeader
            icon={<GlobalOutlined />}
            title={'Actions triggered'}
          />
        </div>
      </div>
      <List
        className="table-list large"
        dataSource={sortedStats}
        loading={isLoading}
        renderItem={(item, i) => {
          const emoji = PLACES[i] || '⭐️'
          return (
            <List.Item className={item.isActive ? 'active' : ''}>
              <div className="table-item">
                <div
                  className="table-col col-10 align-left"
                  style={{ fontSize: '30px' }}
                >
                  {emoji}
                </div>
                <div className="table-col col-50 align-left">
                  {item.userName || item.name} {item.active ? '(You)' : ''}
                </div>
                <div className="table-col col-10">
                  <Badge
                    className="score-badge"
                    count={item.completedActions}
                    showZero
                  />
                </div>
                <div className="table-col col-10">
                  <Badge
                    className="score-badge"
                    count={item.invitesCount.toFixed(1)}
                    showZero
                  />
                </div>
                <div className="table-col col-10">
                  <Badge
                    className="score-badge"
                    count={item.acceptedInvitesCount.toFixed(1)}
                    showZero
                  />
                </div>
                <div className="table-col col-10">
                  <Badge
                    className="score-badge"
                    count={item.totalActionsTriggered}
                    showZero
                  />
                </div>
              </div>
            </List.Item>
          )
        }}
        style={{ margin: '0 0 80px' }}
      />
    </Layout>
  )
}

export async function getStaticProps(props) {
  const { locale, params } = props
  const { teamId } = params

  // Fetch content
  const content = await fetchAllStaticContent(locale)

  // If the team is not set, we cache the 404 for 5 mins.
  if (!teamId) {
    return {
      notFound: true,
      revalidate: 300, // 5min
    }
  }

  return {
    props: {
      content,
      teamId,
    },
    revalidate: 300, // 5min
  }
}

export async function getStaticPaths({ locales }) {
  const teams = await getAllTeams()

  const paths = teams.reduce((allPaths, team) => {
    const pagePaths = locales.map((locale) => ({
      locale,
      params: { teamId: team.teamId },
    }))

    return [...allPaths, ...pagePaths]
  }, [])

  return {
    fallback: false,
    paths,
  }
}
