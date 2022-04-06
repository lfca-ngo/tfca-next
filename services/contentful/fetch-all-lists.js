import pLimit from 'p-limit'

import { fetchListDataById } from './fetch-list-data-by-id'
import { fetchListIds } from './fetch-list-ids'

const limit = pLimit(1)

export const fetchAllLists = async (locale) => {
  const listIds = await fetchListIds()
  const promises = listIds.map((id) =>
    limit(() => fetchListDataById(id, locale))
  )

  const results = await Promise.all(promises)

  return results
}
