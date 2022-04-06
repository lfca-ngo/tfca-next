import { client } from './client'
import { removeFieldsNesting } from './utils'

export const fetchAllNavs = async (locale) => {
  const { items } = await client.getEntries({
    content_type: 'navigation',
    locale,
  })

  const parsedItems = removeFieldsNesting({ fields: { items } }).items

  const navsById = parsedItems.reduce((allNavs, item) => {
    const { navigationId, ...rest } = item
    return { ...allNavs, [navigationId]: { ...rest } }
  }, {})

  return navsById
}
