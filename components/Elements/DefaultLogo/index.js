require('./styles.less')

import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

import { useDarkMode } from '../../../hooks'
import { getLogoSrc } from '../../../utils'

export const DefaultLogo = () => {
  const [isDarkMode] = useDarkMode()
  const logoSrc = getLogoSrc(isDarkMode)
  return (
    <div className="logo">
      <Link href="/">
        <a>
          <Image height={70} src={logoSrc} width={70} />
        </a>
      </Link>
    </div>
  )
}
