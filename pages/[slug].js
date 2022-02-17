import { gql } from 'graphql-request'
import React from 'react'

import SplitLayout from '../components/Layout/SplitLayout'
import {
  fetchAllActions,
  fetchAllNavs,
  fetchContent,
  fetchMetaData,
} from '../services/contentful'
import { SETTINGS_ID } from '../utils'

const ActionCollection = (props) => {
  console.log(props)
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
  const { slug } = params

  const actions = await fetchAllActions(locale, slug)
  const navs = await fetchAllNavs(locale)
  const metaData = await fetchMetaData(locale, SETTINGS_ID)

  return {
    props: {
      actions: actions,
      content: {
        metaData,
        navs,
      },
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
