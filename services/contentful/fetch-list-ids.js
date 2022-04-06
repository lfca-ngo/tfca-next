import { isDev } from '../../utils'
import { fetchContent } from './fetch-content'
import { listCollectionIdsQuery } from './queries'

export const fetchListIds = async () => {
  const { listCollection } = await fetchContent(listCollectionIdsQuery, {
    preview: isDev,
  })

  const ids = listCollection?.items?.map((item) => item.sys.id)
  return ids
}
