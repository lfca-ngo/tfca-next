import { List } from 'antd'
import React, { useState } from 'react'

import { Layout } from '../../components/Layout'

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
      title={`Team ${team.name}`}
    >
      <List
        dataSource={teamStats}
        renderItem={(item) => <List.Item>{item.name}</List.Item>}
      />
    </Layout>
  )
}

export async function getStaticProps({ params }) {
  const { slug } = params

  const team = TEAMS_LIST.find((t) => t.slug === slug)

  // If no team is found, we cache the 404 for 5 mins.
  if (!team) {
    return {
      notFound: true,
      revalidate: 300, // 5min
    }
  }

  return {
    props: {
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
