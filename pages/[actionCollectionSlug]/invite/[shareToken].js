import React from 'react'

import ActionModules from '../../../components/ActionModules'
import { Layout } from '../../../components/Layout'
import { fetchAllStaticData } from '../../../services'
import { decodeShareToken, WITH_SIDEBAR } from '../../../utils'

export default function InvitePage({ actions, stats }) {
  return (
    <Layout layout={actions?.layout || WITH_SIDEBAR} nav={actions?.nav}>
      <ActionModules actions={actions?.items} stats={stats} />
    </Layout>
  )
}

export async function getStaticProps(props) {
  const { locale, params } = props
  try {
    const { actionCollectionSlug, shareToken } = params

    const customization = decodeShareToken(shareToken)

    // Fetch content
    const staticData = await fetchAllStaticData(locale, actionCollectionSlug)

    return {
      props: {
        ...staticData,
        customization: {
          ...customization,
          token: shareToken,
        },
      },
    }
  } catch (e) {
    return {
      notFound: true,
    }
  }
}

export async function getStaticPaths() {
  return { fallback: 'blocking', paths: [] }
}
