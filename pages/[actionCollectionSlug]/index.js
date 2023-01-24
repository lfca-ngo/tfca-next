import React from 'react'

import { ActionModules } from '../../components/ActionModules'
import { Layout } from '../../components/Layout'
import { fetchAllStaticData } from '../../services'
import { fetchActionSlugs } from '../../services/contentful'
import { WITH_SIDEBAR_LAYOUT } from '../../utils'

export default function ActionCollectionPage({
  actions,
  openGraphInfo,
  stats,
}) {
  return (
    <Layout
      layout={actions?.layout || WITH_SIDEBAR_LAYOUT}
      nav={actions?.nav}
      openGraphInfo={openGraphInfo}
    >
      <ActionModules actions={actions?.items} stats={stats} />
    </Layout>
  )
}

export async function getStaticProps({ locale, params }) {
  // we have the locale and can get
  // the correct translations in build
  // time by passing it to the query
  const { actionCollectionSlug } = params
  const staticData = await fetchAllStaticData(locale, actionCollectionSlug)

  return {
    props: {
      ...staticData,
    },
    revalidate: 86400, // 1d
  }
}

export async function getStaticPaths({ locales }) {
  const actionsSlugs = await fetchActionSlugs()

  const paths = actionsSlugs.reduce((allPaths, item) => {
    // prevent old pages from being built
    if (typeof item.layout !== 'string') return allPaths

    const pagePaths = locales.map((locale) => ({
      locale,
      params: { actionCollectionSlug: item.slug },
    }))

    return [...allPaths, ...pagePaths]
  }, [])

  return {
    fallback: false,
    paths,
  }
}
