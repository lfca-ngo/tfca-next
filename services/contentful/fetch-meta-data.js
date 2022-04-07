import { getEntry } from './api'

export const fetchMetaData = async (locale, settingsId) => {
  const res = await getEntry(settingsId, {
    include: 3,
    locale,
    select: 'fields',
  })

  const { lists, resources, ...rest } = res

  const blocks = resources?.reduce((allBlocks, block) => {
    const { key, value } = block
    if (!key) return allBlocks
    return { ...allBlocks, [key]: value }
  }, {})

  const listsByKey = lists?.reduce((allLists, list) => {
    const { items, label = '', listId } = list
    return { ...allLists, [listId]: { items, label } }
  }, {})

  return {
    blocks,
    lists: listsByKey,
    ...rest,
  }
}
