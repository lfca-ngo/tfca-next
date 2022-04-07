import { getEntries } from './api'

export const fetchAllNavs = async (locale) => {
  const items = await getEntries({
    content_type: 'navigation',
    locale,
  })

  const navsById = items.reduce((allNavs, item) => {
    const { navigationId, ...rest } = item
    return { ...allNavs, [navigationId]: { ...rest } }
  }, {})

  return navsById
}
