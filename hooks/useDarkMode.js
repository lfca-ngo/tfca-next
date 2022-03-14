import { useCallback, useEffect } from 'react'
import { useCookies } from 'react-cookie'

import { CSS_THEME_DARK } from '../utils'

const THEME_COOKIE = 'theme'
const LIGHT_THEME = 'light'

export const useDarkMode = () => {
  const [cookies, setCookie] = useCookies()
  const themeValue = cookies[THEME_COOKIE]
  const isDarkMode = themeValue === CSS_THEME_DARK

  const setDarkMode = (isDark) => {
    const htmlEl = document?.documentElement
    const shouldSetDark = CSS_THEME_DARK && htmlEl && isDark

    if (shouldSetDark) {
      htmlEl.classList.add(CSS_THEME_DARK)
    } else {
      htmlEl.classList.remove(CSS_THEME_DARK)
    }

    setCookie(THEME_COOKIE, shouldSetDark ? CSS_THEME_DARK : LIGHT_THEME)

    return () => {
      htmlEl.classList.remove(CSS_THEME_DARK)
    }
  }

  // Only on inital mount, set the cookie to the current theme
  useEffect(() => {
    setDarkMode(isDarkMode)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return [isDarkMode, setDarkMode]
}
