require('../styles/global.less')

import React from 'react'
import { CookiesProvider } from 'react-cookie'

import { ChallengeProvider } from '../hooks/useChallenge'

function MyApp({ Component, pageProps }) {
  return (
    <CookiesProvider>
      <ChallengeProvider>
        <Component {...pageProps} />
      </ChallengeProvider>
    </CookiesProvider>
  )
}

export default MyApp
