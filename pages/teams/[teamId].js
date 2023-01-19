import { Badge, List } from 'antd'
import React from 'react'

import { Layout } from '../../components/Layout'
import { fetchAllStaticContent } from '../../services/contentful'
import { useTeamScores } from '../../services/internal/teamscores'

// Emoji list
const PLACES = ['🥇', '🥈', '🥉']

export default function LeaderBoard({ teamId = '' }) {
  const { data, isLoading } = useTeamScores(teamId)

  const team = teamId.charAt(0).toUpperCase() + teamId.slice(1)

  // const sortedStats = []
  //  useMemo(() => {
  //   return teamStats.sort((a, b) => {
  //     const sum = (a) => a.actionsTaken + a.actionsTriggered + a.invited
  //     return sum(b) - sum(a)
  //   })
  // }, [teamStats])

  return (
    <Layout
      subtitle={
        'Check how you are doing compared to your team. Who will win your teams prizes?'
      }
      theme="rose"
      title={
        <span>
          Team <strong>{team || ''}</strong>
        </span>
      }
    >
      <div className="list-table-header">
        <div className="table-col col-10 align-left" />
        <div className="table-col col-60 align-left">Nickname</div>
        <div className="table-col col-10">Actions taken</div>
        <div className="table-col col-10">Invited</div>
        <div className="table-col col-10">Triggered</div>
      </div>
      <List
        className="table-list large"
        dataSource={data}
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
                  <Badge count={Object.keys(item.acceptedInvites).length} />
                </div>
                <div className="table-col col-10">
                  <Badge count={Object.keys(item.invites).length} />
                </div>
                <div className="table-col col-10">
                  <Badge count={0} />
                </div>
              </div>
            </List.Item>
          )
        }}
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
  return { fallback: true, paths: [] }
}
