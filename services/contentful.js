import { gql, request } from 'graphql-request'

import {
  AllActionsFragment,
  AllNavsFragment,
  MetaDataFragment,
} from '../fragments'
import { SETTINGS_ID } from '../utils'

const space = process.env.NEXT_PUBLIC_CF_SPACE_ID
const accessToken = process.env.NEXT_PUBLIC_CF_ACCESS_TOKEN

// Generic GraphQL client for contentful used
// by all subsequent queries, can also called directly
export const fetchContent = async (query, variables) => {
  try {
    const res = await request({
      document: query,
      requestHeaders: {
        authorization: `Bearer ${accessToken}`,
        'content-type': 'application/json',
      },
      url: `https://graphql.contentful.com/content/v1/spaces/${space}`,
      variables: variables,
    })
    return res || {}
  } catch (error) {
    console.error(
      `There was a problem retrieving entries with the query ${query}`
    )
    console.error(error)
  }
}

// Specific queries are needed because the contentful
// graphql api has a limit for complexity so we need to
// split the calls into multiple queries
export const fetchAllActions = async (locale, slug) => {
  const query = gql`
    ${AllActionsFragment}

    query ($locale: String, $slug: String) {
      actionsLocalCollection(
        limit: 10
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
    slug: slug,
  }

  const { actionsLocalCollection } = await fetchContent(query, variables)
  const [actions] = actionsLocalCollection.items

  console.log(actions)
  const transformed = actions?.actionsCollection?.items.map((item) => {
    // transform blocks to key value pairs
    const blocks = item.blocksCollection?.items.reduce((allBlocks, block) => {
      const { key, value } = block
      return { ...allBlocks, [key]: value }
    }, {})
    // transform lists to key value pairs
    const lists = item.listsCollection?.items.reduce((allLists, list) => {
      const { itemsCollection, listId } = list
      return { ...allLists, [listId]: itemsCollection.items }
    }, {})
    // replace transformed attributes
    const transformedActions = {
      ...item,
      blocks,
      lists,
    }
    return transformedActions
  })

  return transformed
}

export const fetchAllNavs = async (locale) => {
  const query = gql`
    ${AllNavsFragment}
    query ($locale: String) {
      navigationCollection(locale: $locale, limit: 10) {
        ... on NavigationCollection {
          ...AllNavsFragment
        }
      }
    }
  `
  const variables = {
    locale: locale,
  }

  const { navigationCollection } = await fetchContent(query, variables)
  return navigationCollection
}

export const fetchMetaData = async (locale, settingsId) => {
  const query = gql`
    ${MetaDataFragment}
    query ($locale: String, $settingsId: String!) {
      settings(locale: $locale, id: $settingsId) {
        ... on Settings {
          ...MetaDataFragment
        }
      }
    }
  `
  const variables = {
    locale: locale,
    settingsId: settingsId,
  }

  const { settings } = await fetchContent(query, variables)
  return settings
}

// collector function all contentful queries for the
// translator provider that is used on every page
// feeding non page related translations, e.g. navs
// or meta data
export const fetchAllStaticContent = async (locale) => {
  const [navs, metaData] = await Promise.all([
    fetchAllNavs(locale),
    fetchMetaData(locale, SETTINGS_ID),
  ])

  return {
    metaData,
    navs,
  }
}
