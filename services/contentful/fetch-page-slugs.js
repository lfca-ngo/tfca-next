import { getEntries } from './api'

export const fetchPageSlugs = async () => {
  return await getEntries({
    content_type: 'pageLocal',
    select: 'fields.slug',
  })
}
