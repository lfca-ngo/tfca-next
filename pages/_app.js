require('../styles/global.less')

import Head from 'next/head'
import React from 'react'
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
  const ogTitle = pageProps?.openGraphInfo?.ogtitle || null
  const ogDescription = pageProps?.openGraphInfo?.ogdescription || null
  const ogImage = pageProps?.openGraphInfo?.ogimage?.url || null

  return (
    <>
      <Head>
        <meta content="width=device-width, initial-scale=1" name="viewport" />
        {ogTitle && <meta content={ogTitle} property="og:title" />}
        {ogDescription && (
          <meta content={ogDescription} property="og:description" />
        )}
        {ogImage && <meta content={ogImage} property="og:image" />}
        <meta content="summary_large_image" name="twitter:card" />
      </Head>
      <QueryClientProvider client={apiClient}>
        <AppProvider
          content={pageProps?.content}
          customization={pageProps?.customization}
        >
          <ErrorBoundary>
            <Component {...pageProps} />
          </ErrorBoundary>
        </AppProvider>
      </QueryClientProvider>
    </>
  )
}

export default MyApp
