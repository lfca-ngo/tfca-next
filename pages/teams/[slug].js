import { Badge, List } from 'antd'
import React, { useEffect, useMemo, useState } from 'react'

import { Layout } from '../../components/Layout'
import { fetchAllStaticContent } from '../../services/contentful'

// Emoji list
const PLACES = ['🥇', '🥈', '🥉']

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
    actionsTriggered: 3,
    invited: 6,
    name: 'Lisa75',
  },
  {
    actionsTaken: 1,
    actionsTriggered: 4,
    invited: 5,
    name: 'merte143',
  },
  {
    actionsTaken: 2,
    actionsTriggered: 8,
    invited: 3,
    name: 'Peter12',
  },
  {
    actionsTaken: 1,
    actionsTriggered: 10,
    invited: 5,
    name: 'plantlover',
  },
  {
    actionsTaken: 2,
    actionsTriggered: 5,
    invited: 3,
    name: 'system-change1',
  },
  {
    actionsTaken: 1,
    actionsTriggered: 3,
    invited: 5,
    name: 'You12312',
  },
  {
    actionsTaken: 2,
    actionsTriggered: 5,
    invited: 3,
    name: 'Zarathustra91',
  },
  {
    actionsTaken: 1,
    actionsTriggered: 3,
    invited: 5,
    name: 'IamnotyourMD',
  },
]

export default function LeaderBoard({ team }) {
  const [teamStats, setTeamStats] = useState(INITIAL_TEAM_STATS)

  const sortedStats = useMemo(() => {
    return teamStats.sort((a, b) => {
      const sum = (a) => a.actionsTaken + a.actionsTriggered + a.invited
      return sum(b) - sum(a)
    })
  }, [teamStats])

  useEffect(() => {
    const onClick = () => {
      const getRandom = (min, max) =>
        Math.floor(Math.random() * (max - min + 1) + min)

      const randomIndex = getRandom(0, teamStats.length - 1)
      const randomElement = teamStats[randomIndex]
      const statsKeys = Object.keys(teamStats[0])
      const randomKeyIndex = getRandom(0, statsKeys.length - 2)
      const randomKey = statsKeys[randomKeyIndex]

      const countUp = randomElement[randomKey] + 1
      const newElement = {
        ...randomElement,
        [randomKey]: countUp,
      }
      const safeCopy = [...teamStats]
      safeCopy[randomIndex] = newElement

      return setTeamStats(safeCopy)
    }

    window.addEventListener('click', onClick)

    return () => {
      window.removeEventListener('click', onClick)
    }
  }, [teamStats])

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
        <div className="table-col col-10 align-left" />
        <div className="table-col col-60 align-left">Nickname</div>
        <div className="table-col col-10">Actions taken</div>
        <div className="table-col col-10">Invited</div>
        <div className="table-col col-10">Triggered</div>
      </div>
      <List
        className="table-list large"
        dataSource={sortedStats}
        renderItem={(item, i) => {
          const emoji = PLACES[i] || '⭐️'
          return (
            <List.Item>
              <div className="table-item">
                <div
                  className="table-col col-10 align-left"
                  style={{ fontSize: '30px' }}
                >
                  {emoji}
                </div>
                <div className="table-col col-60 align-left">{item.name}</div>
                <div className="table-col col-10">
                  <Badge count={item.actionsTaken} />
                </div>
                <div className="table-col col-10">
                  <Badge count={item.invited} />
                </div>
                <div className="table-col col-10">
                  <Badge count={item.actionsTriggered} />
                </div>
              </div>
            </List.Item>
          )
        }}
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
