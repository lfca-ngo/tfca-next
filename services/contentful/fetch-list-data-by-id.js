import { isDev } from '../../utils'
import { fetchContent } from './fetch-content'
import { listQuery } from './queries'

export const fetchListDataById = async (id, locale) => {
  const { list } = await fetchContent(listQuery, {
    id: id,
    locale: locale,
    preview: isDev,
  })

  return list
}
