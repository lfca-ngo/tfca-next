import { getEntries } from './api'

export const fetchAllActions = async (locale, actionCollectionSlug) => {
  const [actionCollection] = await getEntries({
    content_type: 'actionsLocal',
    'fields.slug': actionCollectionSlug,
    include: 10,
    locale,
  })

  const { actions, layout, openGraphInfo } = actionCollection

  const transformed = transformResults(actions)

  return { ...transformed, layout, openGraphInfo }
}

// Helper function to transform the results into key value pairs
const transformResults = (results) => {
  const nav = []
  const transformed = results?.map((item) => {
    // create a simple summary element, used in nav
    nav.push({
      icon: item.icon?.url || '',
      id: item.id || '',
      title: item.title || '',
    })

    // transform blocks to key value pairs
    const blocks =
      item.blocks?.reduce((allBlocks, block) => {
        const { key, value } = block
        return { ...allBlocks, [key]: value }
      }, {}) || {}

    // transform lists to key value pairs
    const lists =
      item.lists?.reduce((allLists, list) => {
        const { items, label = null, listId } = list
        return {
          ...allLists,
          [listId]: { items, label },
        }
      }, {}) || {}

    // transform data to key value pairs
    const data =
      item.data?.reduce((allData, data) => {
        const {
          cardLayout = null,
          detailViewType = null,
          filters = [],
          items = [],
          listGrid = null,
          listId = null,
        } = data
        return {
          ...allData,
          [listId]: {
            cardLayout,
            detailViewType,
            filters,
            items,
            listGrid,
          },
        }
      }, {}) || {}

    // replace transformed attributes
    const transformedActions = {
      ...item,
      blocks,
      data,
      lists,
    }
    return transformedActions
  })

  return {
    items: transformed,
    nav,
  }
}
