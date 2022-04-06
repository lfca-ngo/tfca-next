import { isDev } from '../../utils'
import { fetchContent } from './fetch-content'
import { settingsListsQuery } from './queries'

export const fetchMetaDataLists = async (locale, settingsId) => {
  const { settings } = await fetchContent(settingsListsQuery, {
    locale: locale,
    preview: isDev,
    settingsId: settingsId,
  })

  const { listsCollection } = settings

  const lists = listsCollection?.items.reduce((allLists, list) => {
    const { itemsCollection, label, listId } = list
    return { ...allLists, [listId]: { items: itemsCollection?.items, label } }
  }, {})

  return lists
}
