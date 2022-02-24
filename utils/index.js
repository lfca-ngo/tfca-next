import { text } from './Text'
export * from './create-share-svg'

export const isDev = process.env.NODE_ENV === 'development'
export const isBrowser = typeof window !== 'undefined'
export const NAVBAR_HEIGHT_XS = 75
export const SETTINGS_ID = '48AtzIK5THq8u72j19vKw1'

export const getFilterOptions = (items, fieldName) => {
  const types = items?.reduce((acc, action) => {
    action?.[fieldName]?.items?.forEach((tag) => {
      if (!acc[tag.key]) {
        acc[tag.key] = {
          iconUrl: tag.icon?.url,
          label: text(tag.value),
          value: tag.key,
        }
      }
    })
    return acc
  }, {})
  // return as array
  return Object.keys(types)?.map((type) => types[type])
}
