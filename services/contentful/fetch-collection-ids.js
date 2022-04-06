import { DEFAULT, isDev } from '../../utils'
import { fetchContent } from './fetch-content'
import { actionsLocalCollectionIdsQuery } from './queries'

export const fetchCollectionIds = async (locale, slug) => {
  const { actionsLocalCollection } = await fetchContent(
    actionsLocalCollectionIdsQuery,
    {
      locale: locale,
      preview: isDev,
      slug: slug,
    }
  )

  const layout = actionsLocalCollection?.items[0]?.layout

  const ids = actionsLocalCollection?.items[0]?.actionsCollection?.items?.map(
    (item) => ({
      blocksLimit: item.blocksCollection.total,
      dataLimit: item.dataCollection.total,
      id: item.sys.id,
      listsLimit: item.listsCollection.total,
      quizLimit: item.quizCollection.total,
    })
  )

  return {
    ids,
    layout: layout || DEFAULT,
    openGraphInfo: actionsLocalCollection?.items[0]?.openGraphInfo,
  }
}
