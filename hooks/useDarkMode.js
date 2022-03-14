import { useEffect } from 'react'
import { useCookies } from 'react-cookie'

import { CSS_THEME_DARK, isBrowser } from '../utils'

const THEME_COOKIE = 'theme'
const LIGHT_THEME = 'light'

export const useDarkMode = () => {
  const [cookies, setCookie] = useCookies()
  const themeValue = cookies[THEME_COOKIE]
  const isDarkMode = themeValue === CSS_THEME_DARK
  const htmlEl = isBrowser() && document?.documentElement

  const addDarkMode = () => htmlEl.classList.add(CSS_THEME_DARK)
  const removeDarkMode = () => htmlEl.classList.remove(CSS_THEME_DARK)

  const setDarkMode = (isDark) => {
    const shouldSetDark = CSS_THEME_DARK && htmlEl && isDark

    if (shouldSetDark) {
      addDarkMode()
    } else {
      removeDarkMode()
    }

    setCookie(THEME_COOKIE, shouldSetDark ? CSS_THEME_DARK : LIGHT_THEME)
  }

  // Only on inital mount, set the them based on the cookie
  useEffect(() => {
    setDarkMode(isDarkMode)

    return () => removeDarkMode()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return [isDarkMode, setDarkMode]
}
