import { text } from './Text'
export * from './create-share-svg'

export const isDev = process.env.NODE_ENV === 'development'
export const isBrowser = () => typeof window !== 'undefined'
export const NAVBAR_HEIGHT_XS = 75
export const SETTINGS_ID = '48AtzIK5THq8u72j19vKw1'

const __CSS_THEME_DARK__ = 'theme-dark'

// setting theme
export const CSS_THEME_DARK = !isBrowser()
  ? __CSS_THEME_DARK__
  : getComputedStyle(document.documentElement)
      ?.getPropertyValue('--THEME--DARK')
      .trim() || __CSS_THEME_DARK__

export const getFilterOptions = (items, fieldName) => {
  const types = items?.reduce((acc, action) => {
    action?.[fieldName]?.items?.forEach((tag) => {
      if (!acc[tag.key]) {
        acc[tag.key] = transformOption(tag, tag.key)
      }
    })
    return acc
  }, {})
  // return as array
  return Object.keys(types)?.map((type) => types[type])
}

export const transformOption = (item, key) => ({
  iconUrl: item.icon?.url,
  label: text(item.value),
  value: key,
})

export const checkAnswers = (arr1, arr2) => {
  return JSON.stringify(arr1) === JSON.stringify(arr2)
}

export const LIST_GRIDS = {
  '1-col': {
    gutter: 16,
    lg: 1,
    md: 1,
    sm: 1,
    xl: 1,
    xs: 1,
    xxl: 1,
  },
  '2-col': {
    gutter: 16,
    lg: 2,
    md: 2,
    sm: 2,
    xl: 2,
    xs: 1,
    xxl: 2,
  },
}

export const SINGLE = 'single'
export const MULTI = 'multi'
export const EMBED = 'embed'
export const DEFAULT = 'default'
