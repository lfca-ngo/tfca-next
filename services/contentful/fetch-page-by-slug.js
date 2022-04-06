import { isDev } from '../../utils'
import { fetchContent } from './fetch-content'
import { pageLocalCollectionQuery } from './queries'

export const fetchPageBySlug = async (locale, slug) => {
  const { pageLocalCollection } = await fetchContent(pageLocalCollectionQuery, {
    locale: locale,
    preview: isDev,
    slug: slug,
  })

  const [pageData] = pageLocalCollection.items

  return pageData
}
