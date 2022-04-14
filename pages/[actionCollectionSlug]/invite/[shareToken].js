import { useRouter } from 'next/router'
import React from 'react'

import { ActionModules } from '../../../components/ActionModules'
import { LoadingSpinner } from '../../../components/Elements'
import { Layout } from '../../../components/Layout'
import { useContentBlocks } from '../../../hooks'
import { fetchAllStaticData } from '../../../services'
import { WITH_SIDEBAR } from '../../../utils'
import { textBlockToString } from '../../../utils'
import { decodeShareToken } from '../../../utils-server-only'

export default function InvitePage({ actions, openGraphInfo, stats }) {
  const router = useRouter()
  const loadingMessage = textBlockToString(
    useContentBlocks('page.route.loading.message')
  )
  // If the page is not yet generated, this will be displayed
  // initially until getStaticProps() finishes running
  if (router.isFallback) {
    return (
      <div>
        <LoadingSpinner
          additionalSpinnerProps={{ color: 'color-3', type: 'leaf' }}
          className="home-loader"
          label={loadingMessage}
        />
      </div>
    )
  }

  return (
    <Layout
      layout={actions?.layout || WITH_SIDEBAR}
      nav={actions?.nav}
      openGraphInfo={openGraphInfo}
    >
      <ActionModules actions={actions?.items} stats={stats} />
    </Layout>
  )
}

export async function getStaticProps(props) {
  const { locale, params } = props
  const { actionCollectionSlug, shareToken } = params

  const customization = decodeShareToken(shareToken)

  // Fetch content
  const staticData = await fetchAllStaticData(locale, actionCollectionSlug)

  return {
    props: {
      ...staticData,
      customization,
    },
  }
}

export async function getStaticPaths() {
  return { fallback: true, paths: [] }
}
