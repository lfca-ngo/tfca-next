require('../styles/global.less')

import React from 'react'
import { CookiesProvider } from 'react-cookie'

import { ChallengeProvider } from '../hooks/useChallenge'
import { TranslationProvider } from '../hooks/useTranslation'

function MyApp({ Component, pageProps }) {
  return (
    <CookiesProvider>
      <ChallengeProvider>
        <TranslationProvider content={pageProps?.content}>
          <Component {...pageProps} />
        </TranslationProvider>
      </ChallengeProvider>
    </CookiesProvider>
  )
}

export default MyApp
