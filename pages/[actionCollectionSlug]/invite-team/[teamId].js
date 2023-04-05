import { useRouter } from 'next/router'
import React from 'react'

import { HomeLoader } from '../../../components/Elements'
import { InviteTeamFlow } from '../../../components/InviteTeamFlow'
import { Layout } from '../../../components/Layout'
import { fetchAllStaticData } from '../../../services'
import { getAllTeams } from '../../../services/firebase'
import { FULL_SCREEN_LAYOUT } from '../../../utils'

export default function InviteTeamPage({ team }) {
  const router = useRouter()

  // If the page is not yet generated, this will be displayed
  // initially until getStaticProps() finishes running
  if (router.isFallback) return <HomeLoader />

  return (
    <Layout layout={FULL_SCREEN_LAYOUT} team={team}>
      <InviteTeamFlow />
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
