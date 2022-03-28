import Head from 'next/head'
import React from 'react'

import ActionModules from '../../../components/ActionModules'
import SplitLayout from '../../../components/Layout/SplitLayout'
import { fetchAllStaticData } from '../../../services'
import { decodeShareToken } from '../../../utils'

export default function InvitePage({ actions, ogImageUrl, stats }) {
  return (
    <>
      <Head>
        <meta content={ogImageUrl} property="og:image" />
      </Head>
      <SplitLayout layout={actions?.layout} nav={actions?.nav}>
        <ActionModules actions={actions?.items} stats={stats} />
      </SplitLayout>
    </>
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
        customization,
        ogImageUrl: `${process.env.BASE_URL}/api/images/${shareToken}`,
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
