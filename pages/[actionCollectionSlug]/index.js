import { gql } from 'graphql-request'
import React from 'react'

import ActionModules from '../../components/ActionModules'
import { Layout } from '../../components/Layout'
import { fetchAllStaticData } from '../../services'
import { fetchContent } from '../../services/contentful'
import { WITH_SIDEBAR } from '../../utils'

export default function ActionCollectionPage({
  actions,
  openGraphInfo,
  stats,
}) {
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
  }
}

export async function getStaticPaths({ locales }) {
  const query = gql`
    query {
      actionsLocalCollection(limit: 50) {
        items {
          layout
          slug
        }
      }
    }
  `
  const { actionsLocalCollection } = await fetchContent(query)

  const paths = actionsLocalCollection.items.reduce((allPaths, item) => {
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
