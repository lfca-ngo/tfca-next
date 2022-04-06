import { fetchContent } from './fetch-content'
import { actionsLocalCollectionSlugsQuery } from './queries'

export const fetchActionSlugs = async () => {
  const { actionsLocalCollection } = await fetchContent(
    actionsLocalCollectionSlugsQuery
  )

  return actionsLocalCollection
}
