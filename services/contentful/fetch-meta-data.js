import { client } from './client'
import { removeFieldsNesting } from './utils'

export const fetchMetaData = async (locale, settingsId) => {
  const res = await client.getEntry(settingsId, {
    include: 3,
    locale,
    select: 'fields',
  })

  const parsed = removeFieldsNesting(res)

  const { lists, resources, ...rest } = parsed

  const blocks = resources?.reduce((allBlocks, block) => {
    const { key, value } = block
    if (!key) return allBlocks
    return { ...allBlocks, [key]: value }
  }, {})

  const listsByKey = lists?.reduce((allLists, list) => {
    const { items, label = '', listId } = list
    return { ...allLists, [listId]: { items, label } }
  }, {})

  const test = {
    blocks,
    lists: listsByKey,
    ...rest,
  }

  return test
}
