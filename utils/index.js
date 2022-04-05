import { v4 as uuidv4 } from 'uuid'

import { text } from './Text'
export * from './create-share-svg'
export * from './names-array-to-string'
export * from './share-token'

export const isDev = process.env.NODE_ENV === 'development'
export const isBrowser = () => typeof window !== 'undefined'
export const SETTINGS_ID = '48AtzIK5THq8u72j19vKw1'

export const WITH_SIDEBAR = 'with-sidebar'
export const TOGGLE_Q_AND_A = 'toggle-q-and-a'

const __CSS_THEME_DARK__ = 'theme-dark'

export const validatePostcode = (value, key) => {
  if (!value || value[key]?.length === 5) {
    return Promise.resolve()
  }

  return Promise.reject(new Error('Postleitzahl ungültig'))
}

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

export const transformOption = (item, key, addOn) => ({
  iconUrl: item.icon?.url,
  label: text(item.value),
  value: key,
  ...addOn,
})

export const checkAnswers = (arr1, arr2) => {
  return JSON.stringify(arr1) === JSON.stringify(arr2)
}

export const scrollToId = (id) => {
  const section = document.querySelector(`#${id}`)
  section?.scrollIntoView({ behavior: 'smooth', block: 'start' })
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

export const UID_COOKIE_NAME = 'ui'
export const ANALYTICS_CONSENT_COOKIE_NAME = 'cookies.statistical'

export const setCookie = (name, value) => {
  if (!isBrowser()) return
  window.localStorage.setItem(name, value)
}

export const getCookie = (name) => {
  if (!isBrowser()) return null
  return window.localStorage.getItem(name)
}

export const deleteCookie = (name) => {
  if (!isBrowser()) return
  window.localStorage.removeItem(name)
}

// gets & sets uid in window variable
export const getWindowUid = () => {
  if (!isBrowser()) return null
  if (window.ui) return window.ui
  const newUid = uuidv4()
  window.ui = newUid
  return newUid
}

export const INITIAL_STATS = {
  climate_activism: 1386,
  ecosia: 1252,
  green_finances: 746,
  measure_reduce: 3805,
  politics: 2781,
  share_deck: 969,
  switch_energy: 2218,
}

export const getLogoSrc = (isDarkMode) =>
  isDarkMode ? '/images/logo_darkmode.svg' : '/images/logo.svg'

export const getMailToLink = ({ body, cc, subject, to }) => {
  const args = []
  if (typeof subject !== 'undefined') {
    args.push('subject=' + encodeURIComponent(subject))
  }
  if (typeof body !== 'undefined') {
    args.push('body=' + encodeURIComponent(body))
  }
  if (typeof cc !== 'undefined') {
    args.push('cc=' + encodeURIComponent(cc))
  }
  let url = 'mailto:' + encodeURIComponent(to)
  if (args.length > 0) {
    url += '?' + args.join('&')
  }
  return url
}
