import { client } from './client'
import { removeFieldsNesting } from './utils'

export const fetchPageBySlug = async (locale, slug) => {
  const { items } = await client.getEntries({
    content_type: 'pageLocal',
    'fields.slug': slug,
    locale,
  })

  return removeFieldsNesting({ fields: { items } }).items[0]
}
