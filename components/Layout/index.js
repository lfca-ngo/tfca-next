import Head from 'next/head'
import React, { Fragment } from 'react'

import CookieConsent from '../CookieConsent'

const Template = ({ children }) => {
  return (
    <Fragment>
      <div className={`siteRoot`}>
        <Head>
          <title>TFCA</title>
          <meta charSet="utf-8" />
          <link href={favicon} rel="icon" />
        </Head>

        <div className="siteContent">
          {children}
          {/* <CookieConsent
            cookieName={'consentCookieName'}
            cookieValue={'consentCookieAccept'}
            declineCookieValue={'consentCookieDeclined'}
            expires={60}
          /> */}
        </div>
      </div>
    </Fragment>
  )
}

export default Template
