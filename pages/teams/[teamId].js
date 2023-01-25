import { Badge, List } from 'antd'
import React, { useMemo } from 'react'

import { Layout } from '../../components/Layout'
import { fetchAllStaticContent } from '../../services/contentful'
import { useTeamScores } from '../../services/internal/teamscores'

// Emoji list
const PLACES = ['🥇', '🥈', '🥉']
// Static data for testing
const TEAM_IDS = ['blinkist', 'springer', 'lfca']

export default function LeaderBoard({ teamId = '' }) {
  const { data = [], isLoading } = useTeamScores(teamId)

  const team = teamId.charAt(0).toUpperCase() + teamId.slice(1)

  const sortedStats = useMemo(() => {
    return data?.sort((a, b) => {
      const sum = (a) =>
        a.triggeredActionsCount + a.invitesCount + a.acceptedInvitesCount
      return sum(b) - sum(a)
    })
  }, [data])

  return (
    <Layout
      subtitle={
        'Check how you are doing compared to your team. Who will win your teams prizes?'
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
        <div className="table-col col-60 align-left">Nickname</div>
        <div className="table-col col-10">Accepted Invites</div>
        <div className="table-col col-10">Invited</div>
        <div className="table-col col-10">Actions Triggered</div>
      </div>
      <List
        className="table-list large"
        dataSource={sortedStats}
        loading={isLoading}
        renderItem={(item, i) => {
          const emoji = PLACES[i] || '⭐️'
          return (
            <List.Item className={item.active ? 'active' : ''}>
              <div className="table-item">
                <div
                  className="table-col col-10 align-left"
                  style={{ fontSize: '30px' }}
                >
                  {emoji}
                </div>
                <div className="table-col col-60 align-left">
                  {item.name} {item.active ? '(You)' : ''}
                </div>
                <div className="table-col col-10">
                  <Badge
                    className="score-badge"
                    count={item.acceptedInvitesCount}
                    showZero
                  />
                </div>
                <div className="table-col col-10">
                  <Badge
                    className="score-badge"
                    count={item.invitesCount}
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

  return {
    props: {
      content,
      teamId,
    },
  }
}

export async function getStaticPaths() {
  const paths = TEAM_IDS.map((team) => ({
    params: { teamId: team },
  }))

  return {
    fallback: false,
    paths,
  }
}
