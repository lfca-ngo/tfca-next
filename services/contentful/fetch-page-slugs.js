import { client } from './client'
import { removeFieldsNesting } from './utils'

export const fetchPageSlugs = async () => {
  try {
    const { items } = await client.getEntries({
      content_type: 'pageLocal',
      select: 'fields.slug',
    })

    return removeFieldsNesting({ fields: { items } }).items
  } catch (e) {
    console.error(e)
  }
}
