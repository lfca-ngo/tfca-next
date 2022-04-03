import { fetchStats } from './analytics'
import { fetchAllActions, fetchAllStaticContent } from './contentful'

export const fetchAllStaticData = async (locale, actionCollectionSlug) => {
  const { openGraphInfo, ...actions } = await fetchAllActions(
    locale,
    actionCollectionSlug
  )
  const content = await fetchAllStaticContent(locale)
  const stats = await fetchStats()

  return { actions, content, openGraphInfo, stats }
}
