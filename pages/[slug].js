import { gql } from 'graphql-request'
import React from 'react'

import SplitLayout from '../components/Layout/SplitLayout'
import {
  fetchAllActions,
  fetchAllStaticContent,
  fetchContent,
} from '../services/contentful'
import { useSwitchRates } from '../services/switchforclimate'

const ActionCollection = (props) => {
  // const { data, error, isFetching, status } = useSwitchRates(
  //   '12043',
  //   'Berlin',
  //   2200,
  //   '9900080000007'
  // )

  return (
    <SplitLayout>
      <div style={{ background: 'red', height: '1000px' }}>
        <h1>Space for actions!</h1>
      </div>
    </SplitLayout>
  )
}

export async function getStaticProps({ locale, params }) {
  // we have the locale and can get
  // the correct translations in build
  // time by passing it to the query
  const { slug } = params

  const actions = await fetchAllActions(locale, slug)
  const content = await fetchAllStaticContent(locale)

  return {
    props: {
      actions: actions,
      content: content,
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
