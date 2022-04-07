import pLimit from 'p-limit'

import { SETTINGS_ID } from '../../utils'
import { fetchAllNavs } from './fetch-all-navs'
import { fetchMetaData } from './fetch-meta-data'

const limit = pLimit(1)

// collector function all contentful queries for the
// translator provider that is used on every page
// feeding non page related translations, e.g. navs
// or meta data
export const fetchAllStaticContent = async (locale) => {
  const promises = [
    limit(() => fetchAllNavs(locale)),
    limit(() => fetchMetaData(locale, SETTINGS_ID)),
  ]

  const [navs, metaData] = await Promise.all(promises)

  return {
    metaData,
    navs,
  }
}
