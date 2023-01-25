import { useRouter } from 'next/router'
import React from 'react'

import { ActionModules } from '../../../components/ActionModules'
import { HomeLoader } from '../../../components/Elements'
import { Layout } from '../../../components/Layout'
import { fetchAllStaticData } from '../../../services'
import { trackAcceptedInvite } from '../../../services/firebase'
import { WITH_SIDEBAR_LAYOUT } from '../../../utils'
import { decodeShareToken } from '../../../utils-server-only'

export default function InvitePage({
  actions,
  openGraphInfo,
  presetUid,
  stats,
}) {
  const router = useRouter()
  // If the page is not yet generated, this will be displayed
  // initially until getStaticProps() finishes running
  if (router.isFallback) return <HomeLoader />

  return (
    <Layout
      layout={actions?.layout || WITH_SIDEBAR_LAYOUT}
      nav={actions?.nav}
      openGraphInfo={openGraphInfo}
      presetUid={presetUid}
    >
      <ActionModules actions={actions?.items} stats={stats} />
    </Layout>
  )
}

export async function getStaticProps(props) {
  const { locale, params } = props
  const { actionCollectionSlug, shareToken } = params

  const customization = decodeShareToken(shareToken)

  // track the accepted invite in firestore
  try {
    await trackAcceptedInvite({
      invitedUserId: customization.invitedUserId,
      referredByTeamId: customization.referredByTeamId,
      referredByUserId: customization.referredByUserId,
    })
  } catch (e) {
    console.error('Error tracking invite: ', e)
  }

  // Fetch content
  const staticData = await fetchAllStaticData(locale, actionCollectionSlug)

  return {
    props: {
      ...staticData,
      customization,
      presetUid: customization.invitedUserId || null,
    },
  }
}

export async function getStaticPaths() {
  return { fallback: true, paths: [] }
}
