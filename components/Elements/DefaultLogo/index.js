require('./styles.less')

import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

import { useUser } from '../../../hooks'
import { getLogoSrc } from '../../../utils'

export const DefaultLogo = ({ isMobile }) => {
  const { actionCollectionSlug, isLoggedIn, user } = useUser()
  const logoSrc = getLogoSrc(isMobile)
  const isLoggedInWithTeam = user?.teamId && isLoggedIn

  // check in local storage if the user has a team preference
  // if so, navigate to the teams page
  let homeLink = `/${actionCollectionSlug}`

  if (isLoggedInWithTeam) {
    homeLink = `/${actionCollectionSlug}/team/${user.teamId}`
  }

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
