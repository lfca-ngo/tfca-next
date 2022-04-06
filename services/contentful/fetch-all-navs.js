import { isDev } from '../../utils'
import { fetchContent } from './fetch-content'
import { navigationCollectionQuery } from './queries'

export const fetchAllNavs = async (locale) => {
  const { navigationCollection } = await fetchContent(
    navigationCollectionQuery,
    {
      locale: locale,
      preview: isDev,
    }
  )

  const navsById = navigationCollection?.items.reduce((allNavs, nav) => {
    const { navigationId, ...rest } = nav
    return { ...allNavs, [navigationId]: { ...rest } }
  }, {})

  return navsById
}
