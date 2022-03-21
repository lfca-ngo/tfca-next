require('../styles/global.less')

import React from 'react'
import { CookiesProvider } from 'react-cookie'
import { QueryClient, QueryClientProvider } from 'react-query'

import { AppProvider } from '../hooks'

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
        <AppProvider
          content={pageProps?.content}
          customization={pageProps?.customization}
        >
          <Component {...pageProps} />
        </AppProvider>
      </CookiesProvider>
    </QueryClientProvider>
  )
}

export default MyApp
