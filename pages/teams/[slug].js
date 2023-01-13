import { List } from 'antd'
import React, { useState } from 'react'

import { Layout } from '../../components/Layout'
import { fetchAllStaticContent } from '../../services/contentful'

// Static Demo data
const TEAMS_LIST = [
  {
    name: 'Blinkist',
    slug: 'blinkist',
  },
]

const INITIAL_TEAM_STATS = [
  {
    actionsTaken: 2,
    actionsTriggered: 5,
    invited: 3,
    name: 'Peter12',
  },
  {
    actionsTaken: 1,
    actionsTriggered: 3,
    invited: 5,
    name: 'merte143',
  },
]

export default function LeaderBoard({ team }) {
  const [teamStats, setTeamStats] = useState(INITIAL_TEAM_STATS)

  return (
    <Layout
      subtitle={
        'Check how you are doing compared to your team. Who will win your teams prizes?'
      }
      theme="rose"
      title={
        <span>
          Team <strong>{team.name}</strong>
        </span>
      }
    >
      <div className="list-table-header">
        <div className="table-col col-30">Nickname</div>
        <div className="table-col col-30">Actions taken</div>
        <div className="table-col col-20">Invited</div>
        <div className="table-col col-20">Triggered</div>
      </div>
      <List
        className="table-list"
        dataSource={teamStats}
        renderItem={(item) => (
          <List.Item>
            <div className="table-item">
              <div className="table-col col-30">{item.name}</div>
              <div className="table-col col-30">{item.actionsTaken}</div>
              <div className="table-col col-20">{item.invited}</div>
              <div className="table-col col-20">{item.actionsTriggered}</div>
            </div>
          </List.Item>
        )}
      />
    </Layout>
  )
}

export async function getStaticProps({ locale, params }) {
  const { slug } = params

  const team = TEAMS_LIST.find((t) => t.slug === slug)

  const content = await fetchAllStaticContent(locale)

  // If no team is found, we cache the 404 for 5 mins.
  if (!team) {
    return {
      notFound: true,
      revalidate: 300, // 5min
    }
  }

  return {
    props: {
      content,
      team,
    },
  }
}

export async function getStaticPaths() {
  const paths = TEAMS_LIST.map((t) => ({ params: { slug: t.slug } }))

  return {
    fallback: false,
    paths,
  }
}
