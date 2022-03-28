require('../styles/global.less')

import Head from 'next/head'
import React from 'react'
import { CookiesProvider } from 'react-cookie'
import { QueryClient, QueryClientProvider } from 'react-query'

import { ErrorBoundary } from '../components/ErrorBoundary'
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
    <>
      <Head>
        <meta content="width=device-width, initial-scale=1" name="viewport" />
      </Head>
      <QueryClientProvider client={apiClient}>
        <CookiesProvider>
          <AppProvider
            content={pageProps?.content}
            customization={pageProps?.customization}
          >
            <ErrorBoundary>
              <Component {...pageProps} />
            </ErrorBoundary>
          </AppProvider>
        </CookiesProvider>
      </QueryClientProvider>
    </>
  )
}

export default MyApp
