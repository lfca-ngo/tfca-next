import { getEntries } from './api'

export const fetchPageBySlug = async (locale, slug) => {
  const items = await getEntries({
    content_type: 'pageLocal',
    'fields.slug': slug,
    locale,
  })

  return items[0]
}
