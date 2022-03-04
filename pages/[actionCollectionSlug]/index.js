import { gql } from 'graphql-request'
import React from 'react'

import ActionModules from '../../components/ActionModules'
import SplitLayout from '../../components/Layout/SplitLayout'
import {
  fetchAllActions,
  fetchAllStaticContent,
  fetchContent,
} from '../../services/contentful'

export default function ActionCollectionPage({ actions }) {
  return (
    <SplitLayout layout={actions?.layout} nav={actions?.nav}>
      <ActionModules actions={actions?.items} />
    </SplitLayout>
  )
}

export async function getStaticProps({ locale, params }) {
  // we have the locale and can get
  // the correct translations in build
  // time by passing it to the query
  const { actionCollectionSlug } = params

  const actions = await fetchAllActions(locale, actionCollectionSlug)
  const content = await fetchAllStaticContent(locale)

  return {
    props: {
      actions,
      content,
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
    if (typeof item.layout === 'undefined') return allPaths

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
