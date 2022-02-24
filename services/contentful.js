import { gql, request } from 'graphql-request'

import {
  ActionFragment,
  AllNavsFragment,
  MetaDataFragment,
  MetaDataListsFragment,
} from '../fragments/contentful'
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
  const { resourcesCollection, ...rest } = settings

  const blocks = resourcesCollection?.items.reduce((allBlocks, block) => {
    const { key, value } = block
    if (!key) return allBlocks
    return { ...allBlocks, [key]: value }
  }, {})

  return {
    blocks,
    ...rest,
  }
}

export const fetchMetaDataLists = async (locale, settingsId) => {
  const query = gql`
    ${MetaDataListsFragment}
    query ($locale: String, $settingsId: String!) {
      settings(locale: $locale, id: $settingsId) {
        ... on Settings {
          ...MetaDataListsFragment
        }
      }
    }
  `
  const variables = {
    locale: locale,
    settingsId: settingsId,
  }

  const { settings } = await fetchContent(query, variables)
  const { listsCollection } = settings

  const lists = listsCollection?.items.reduce((allLists, list) => {
    const { itemsCollection, listId } = list
    return { ...allLists, [listId]: itemsCollection }
  }, {})

  return lists
}

// collector function all contentful queries for the
// translator provider that is used on every page
// feeding non page related translations, e.g. navs
// or meta data
export const fetchAllStaticContent = async (locale) => {
  const [navs, metaData, metaDataLists] = await Promise.all([
    fetchAllNavs(locale),
    fetchMetaData(locale, SETTINGS_ID),
    fetchMetaDataLists(locale, SETTINGS_ID),
  ])

  return {
    metaData,
    metaDataLists,
    navs,
  }
}

// Fetch all action module related content
// to prevent too complex queries we fetch the collection
// ids in a separate query and afterwards get the content
// for each action module with a separate api call
export const fetchCollectionIds = async (locale, slug) => {
  const query = gql`
    query ($locale: String, $slug: String) {
      actionsLocalCollection(
        limit: 1
        locale: $locale
        where: { slug: $slug }
      ) {
        items {
          actionsCollection(limit: 15) {
            items {
              ... on Action {
                sys {
                  id
                }
              }
            }
          }
        }
      }
    }
  `
  const variables = {
    locale: locale,
    slug: slug,
  }

  const { actionsLocalCollection } = await fetchContent(query, variables)
  const ids = actionsLocalCollection?.items[0]?.actionsCollection?.items?.map(
    (item) => item.sys.id
  )
  return ids
}

// Fetch all action module related content
const fetchActionDataById = async (id, locale) => {
  const query = gql`
    ${ActionFragment}
    query ($locale: String, $id: String!) {
      action(id: $id, locale: $locale) {
        ... on Action {
          ...ActionFragment
        }
      }
    }
  `
  const variables = {
    id: id,
    locale: locale,
  }

  const { action } = await fetchContent(query, variables)
  return action
}

export const fetchAllActions = async (locale, actionCollectionSlug) => {
  const collectionIds = await fetchCollectionIds(locale, actionCollectionSlug)
  const promises = collectionIds.map((id) => fetchActionDataById(id, locale))

  const results = await Promise.all(promises)
  const transformed = transformResults(results)

  return transformed
}

// Helper function to transform the results
const transformResults = (results) => {
  const transformed = results?.map((item) => {
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
    // transform data to key value pairs
    const data = item.dataCollection?.items.reduce((allData, data) => {
      const { itemsCollection, listId } = data
      return { ...allData, [listId]: itemsCollection.items }
    }, {})
    // replace transformed attributes
    const transformedActions = {
      ...item,
      blocks,
      data,
      lists,
    }
    return transformedActions
  })

  return transformed
}
