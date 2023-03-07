require('./styles.less')

import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

import {
  getCookie,
  getLogoSrc,
  PREFERRED_HOME_COOKIE_NAME,
} from '../../../utils'

export const DefaultLogo = ({ isMobile }) => {
  const logoSrc = getLogoSrc(isMobile)

  // check in local storage if the user has a team preference
  // if so, navigate to the teams page
  const homeLink = getCookie(PREFERRED_HOME_COOKIE_NAME) || '/'

  return (
    <div className="default-logo">
      <div className="default-logo-wrapper">
        <Link href={homeLink}>
          <a>
            <Image layout="fill" objectFit="contain" src={logoSrc} />
          </a>
        </Link>
      </div>
    </div>
  )
}
