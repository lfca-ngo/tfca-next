import Head from 'next/head'
import React from 'react'

import ActionModules from '../../../components/ActionModules'
import SplitLayout from '../../../components/Layout/SplitLayout'
import { fetchAllStaticData } from '../../../services'
import { decodeShareToken } from '../../../utils'

export default function InvitePage({ actions, stats }) {
  return (
    <SplitLayout layout={actions?.layout} nav={actions?.nav}>
      <ActionModules actions={actions?.items} stats={stats} />
    </SplitLayout>
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
