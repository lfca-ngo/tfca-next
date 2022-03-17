import Icon from '@ant-design/icons'
import React from 'react'

import IconMoon from '../../../assets/icons/moon.svg'
import IconSun from '../../../assets/icons/sun.svg'
import { useDarkMode } from '../../../hooks/useDarkMode'

export const DarkModeSelector = () => {
  const [isDarkMode, setDarkMode] = useDarkMode()
  const toggleDarkMode = () => setDarkMode(!isDarkMode)

  return (
    <Icon
      component={isDarkMode ? IconSun : IconMoon}
      onClick={toggleDarkMode}
    />
  )
}
