import { fetchContent } from './fetch-content'
import { pageLocalCollectionSlugsQuery } from './queries'

export const fetchPageSlugs = async () => {
  const { pageLocalCollection } = await fetchContent(
    pageLocalCollectionSlugsQuery
  )
  return pageLocalCollection
}
