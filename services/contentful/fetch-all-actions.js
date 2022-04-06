import pLimit from 'p-limit'

import { fetchActionDataById } from './fetch-action-data-by-id'
import { fetchAllLists } from './fetch-all-lists'
import { fetchCollectionIds } from './fetch-collection-ids'

const limit = pLimit(1)

export const fetchAllActions = async (locale, actionCollectionSlug) => {
  const {
    ids: collectionIds,
    layout,
    openGraphInfo,
  } = await fetchCollectionIds(locale, actionCollectionSlug)

  const promises = collectionIds.map((id) =>
    limit(() => fetchActionDataById(id, locale))
  )

  const actionsResults = await Promise.all(promises)
  // `listsCollection` and `dataCollection` (both only can conatin List type) are fetched separatly
  const listsResults = await fetchAllLists(locale)

  const listsById = listsResults.reduce((acc, curr) => {
    acc[curr.sys.id] = curr
    return acc
  }, {})

  // Enrich each action with the seperatly fetched `listsCollection` and `dataCollection`
  const enrichedActions = actionsResults.map((action) => {
    action.listsCollection.items = action.listsCollection.items.map(
      (item) => listsById[item.sys.id]
    )
    action.dataCollection.items = action.dataCollection.items.map(
      (item) => listsById[item.sys.id]
    )
    return action
  })

  const transformed = transformResults(enrichedActions)

  return { ...transformed, layout, openGraphInfo }
}

// Helper function to transform the results into key value pairs
const transformResults = (results) => {
  const nav = []
  const transformed = results?.map(
    ({ blocksCollection, dataCollection, listsCollection, ...item }) => {
      // create a simple summary element, used in nav
      nav.push({
        icon: item.icon?.url || '',
        id: item.id || '',
        title: item.title || '',
      })

      // transform blocks to key value pairs
      const blocks = blocksCollection?.items.reduce((allBlocks, block) => {
        const { key, value } = block
        return { ...allBlocks, [key]: value }
      }, {})
      // transform lists to key value pairs
      const lists = listsCollection?.items.reduce((allLists, list) => {
        const { itemsCollection, label, listId } = list
        return {
          ...allLists,
          [listId]: { items: itemsCollection.items, label },
        }
      }, {})
      // transform data to key value pairs
      const data = dataCollection?.items.reduce((allData, data) => {
        const {
          cardLayout,
          detailViewType,
          filtersCollection,
          itemsCollection,
          listGrid,
          listId,
        } = data
        return {
          ...allData,
          [listId]: {
            cardLayout,
            detailViewType,
            filters: filtersCollection?.items || [],
            items: itemsCollection?.items || [],
            listGrid,
          },
        }
      }, {})
      // replace transformed attributes
      const transformedActions = {
        ...item,
        blocks,
        data,
        lists,
      }
      return transformedActions
    }
  )

  return {
    items: transformed,
    nav,
  }
}
