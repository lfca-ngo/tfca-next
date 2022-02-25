require('../styles/global.less')

import React from 'react'
import { CookiesProvider } from 'react-cookie'
import { QueryClient, QueryClientProvider } from 'react-query'

import { ChallengeProvider } from '../hooks/useChallenge'
import { IsMobileProvider } from '../hooks/useIsClient'
import { TranslationProvider } from '../hooks/useTranslation'

const apiClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: Infinity,
    },
  },
})

function MyApp({ Component, pageProps }) {
  return (
    <QueryClientProvider client={apiClient}>
      <CookiesProvider>
        <ChallengeProvider customization={pageProps?.customization}>
          <TranslationProvider content={pageProps?.content}>
            <IsMobileProvider>
              <Component {...pageProps} />
            </IsMobileProvider>
          </TranslationProvider>
        </ChallengeProvider>
      </CookiesProvider>
    </QueryClientProvider>
  )
}

export default MyApp
