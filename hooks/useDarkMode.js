import { useEffect } from 'react'

import { CSS_THEME_DARK } from '../utils'

export const useDarkMode = () => {
  useEffect(() => {
    const htmlEl = document?.documentElement

    console.log('jo?')
    if (CSS_THEME_DARK && htmlEl) {
      htmlEl.classList.add(CSS_THEME_DARK)
    }

    return () => {
      htmlEl.classList.remove(CSS_THEME_DARK)
    }
  }, [])
}
