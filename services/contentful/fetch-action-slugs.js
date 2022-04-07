import { getEntries } from './api'

export const fetchActionSlugs = async () => {
  return await getEntries({
    content_type: 'actionsLocal',
    select: 'fields.slug,fields.layout',
  })
}
