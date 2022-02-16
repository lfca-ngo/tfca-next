import { gql } from 'graphql-request'
import React from 'react'

import SplitLayout from '../components/Layout/SplitLayout'
import { fetchContent } from '../services/contentful'
import { AllActionsFragment, AllNavsFragment } from '../utils/fragments'

const ActionCollection = (props) => {
  return (
    <SplitLayout>
      <h1>Space for actions!</h1>
    </SplitLayout>
  )
}

export async function getStaticProps({ locale, params }) {
  // we have the locale and can get
  // the correct translations in build
  // time by passing it to the query
  const query = gql`
    ${AllActionsFragment}
    ${AllNavsFragment}
    query ($locale: String, $slug: String) {
      navigationCollection(locale: $locale) {
        ... on NavigationCollection {
          ...AllNavsFragment
        }
      }
      actionsLocalCollection(
        limit: 50
        locale: $locale
        where: { slug: $slug }
      ) {
        ... on ActionsLocalCollection {
          ...AllActionsFragment
        }
      }
    }
  `
  const variables = {
    locale: locale,
    preview: false, // true = get unpublished cf entries
    slug: params.slug,
  }

  const { actionsLocalCollection, navigationCollection } = await fetchContent(
    query,
    variables
  )

  return {
    props: {
      actions: actionsLocalCollection.items[0],
      navigationCollection,
    },
  }
}

export async function getStaticPaths({ locales }) {
  const query = gql`
    query {
      actionsLocalCollection(limit: 50) {
        items {
          slug
        }
      }
    }
  `
  const { actionsLocalCollection } = await fetchContent(query)

  const paths = actionsLocalCollection.items.reduce((allPaths, item) => {
    const pagePaths = locales.map((locale) => ({
      locale,
      params: { slug: item.slug },
    }))

    return [...allPaths, ...pagePaths]
  }, [])

  return {
    fallback: false,
    paths,
  }
}

export default ActionCollection
