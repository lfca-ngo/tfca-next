require('./styles.less')

import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

import { getLogoSrc } from '../../../utils'

export const DefaultLogo = () => {
  const logoSrc = getLogoSrc(true)
  return (
    <div className="logo">
      <Link href="/">
        <a>
          <Image height={66} src={logoSrc} width={66} />
        </a>
      </Link>
    </div>
  )
}
