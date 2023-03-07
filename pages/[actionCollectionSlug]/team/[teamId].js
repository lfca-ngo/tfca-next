import { useRouter } from 'next/router'
import React, { useEffect } from 'react'

import { ActionModules } from '../../../components/ActionModules'
import { HomeLoader } from '../../../components/Elements'
import { Layout } from '../../../components/Layout'
import { fetchAllStaticData } from '../../../services'
import { getAllTeams } from '../../../services/firebase'
import {
  PREFERRED_HOME_COOKIE_NAME,
  setCookie,
  WITH_SIDEBAR_LAYOUT,
} from '../../../utils'

export default function TeamPage({
  actionCollectionSlug,
  actions,
  openGraphInfo,
  stats,
  team,
}) {
  const router = useRouter()

  // save the team as a weak preference in the local storage.
  // when navigating back from leaderboard and other pages, we want
  // to persist the team selection
  useEffect(() => {
    if (team?.teamId) {
      setCookie(
        PREFERRED_HOME_COOKIE_NAME,
        `/${actionCollectionSlug}/team/${team?.teamId}`
      )
    }
  }, [actionCollectionSlug, team])

  // If the page is not yet generated, this will be displayed
  // initially until getStaticProps() finishes running
  if (router.isFallback) return <HomeLoader />

  return (
    <Layout
      layout={actions?.layout || WITH_SIDEBAR_LAYOUT}
      nav={actions?.nav}
      openGraphInfo={openGraphInfo}
      team={team}
    >
      <ActionModules actions={actions?.items} stats={stats} />
    </Layout>
  )
}

export async function getStaticProps({ locale, params }) {
  // we have the locale and can get
  // the correct translations in build
  // time by passing it to the query
  const { actionCollectionSlug, teamId } = params

  const staticData = await fetchAllStaticData(locale, actionCollectionSlug)
  const allTeams = await getAllTeams()
  const team = allTeams.find((team) => team.teamId === teamId)

  // If the company is still not qualified, we cache the 404 for 5 mins.
  if (!team) {
    return {
      notFound: true,
      revalidate: 300, // 5min
    }
  }

  return {
    props: {
      ...staticData,
      actionCollectionSlug,
      team: {
        teamId: team.teamId,
      },
    },
    revalidate: 86400, // 24h
  }
}

export async function getStaticPaths() {
  const allTeams = await getAllTeams()

  return {
    fallback: true,
    paths: allTeams.map((team) => ({
      locale: 'en',
      params: {
        actionCollectionSlug: 'int',
        teamId: team.teamId,
      },
    })),
  }
}
