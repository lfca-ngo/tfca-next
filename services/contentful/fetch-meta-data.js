import { isDev } from '../../utils'
import { fetchContent } from './fetch-content'
import { settingsQuery } from './queries'

export const fetchMetaData = async (locale, settingsId) => {
  const { settings } = await fetchContent(settingsQuery, {
    locale: locale,
    preview: isDev,
    settingsId: settingsId,
  })

  const { resourcesCollection, ...rest } = settings

  const blocks = resourcesCollection?.items.reduce((allBlocks, block) => {
    const { key, value } = block
    if (!key) return allBlocks
    return { ...allBlocks, [key]: value }
  }, {})

  return {
    blocks,
    ...rest,
  }
}
