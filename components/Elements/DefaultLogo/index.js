require('./styles.less')

import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

import { getLogoSrc } from '../../../utils'

export const DefaultLogo = () => {
  const logoSrc = getLogoSrc(true)
  return (
    <div className="default-logo">
      <div className="default-logo-wrapper">
        <Link href="/">
          <a>
            <Image layout="fill" objectFit="contain" src={logoSrc} />
          </a>
        </Link>
      </div>
    </div>
  )
}
