import { Head, Html, Main, NextScript } from 'next/document'
import React from 'react'

export default function Document() {
  return (
    <Html>
      <Head>
        <link
          href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;500;600;800&display=swap"
          rel="stylesheet"
        />
        <link href="/favicon.ico" rel="shortcut icon" />
        <link href="/images/logo192.png" rel="apple-touch-icon" />
        <link href="/manifest.json" rel="manifest" />

        {/* set color of the address bar */}
        <meta content="#d82086" name="theme-color" />
        {/* set color of the address bar on Apple smatphones */}
        <meta content="#d82086" name="apple-mobile-web-app-status-bar" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
