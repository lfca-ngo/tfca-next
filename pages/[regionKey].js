import { gql } from 'graphql-request'
import React from 'react'

import SplitLayout from '../components/Layout/SplitLayout'
import { fetchContent } from '../services/contentful'
import { AllNavsFragment } from '../utils/fragments'

const ActionCollection = (props) => {
  console.log(props)
  return (
    <SplitLayout>
      <h1>Hallo!</h1>
    </SplitLayout>
  )
}

export async function getStaticProps({ locale, params }) {
  // we have the locale and can get the correct translations in
  // build time by passing it to the query

  const query = gql`
    ${AllNavsFragment}
    query ($preview: Boolean, $locale: String) {
      navigationCollection(preview: $preview, locale: $locale) {
        ... on NavigationCollection {
          ...AllNavsFragment
        }
      }
    }
  `
  const variables = {
    locale: locale,
    preview: false,
  }
  const { navigationCollection } = await fetchContent(query, variables)
  console.log(navigationCollection, params, locale)

  return {
    props: {
      // pageData: item,
      navigationCollection,
      test: params,
    },
  }
}

export async function getStaticPaths({ defaultLocale, locales }) {
  const regions = ['de', 'fr']

  const paths = regions.reduce((allPaths, region) => {
    const locales = ['en', 'de', 'tr']
    const pagePaths = locales.map((locale) => ({
      locale,
      params: { regionKey: region },
    }))

    return [...allPaths, ...pagePaths]
  }, [])

  return {
    fallback: false,
    paths,
  }
}

export default ActionCollection
