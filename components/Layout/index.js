require('../../styles/override-ant-globals.less')

import classNames from 'classnames'
import Head from 'next/head'
import React, { Fragment } from 'react'

import CookieConsent from '../CookieConsent'

const Template = ({ children, className }) => {
  return (
    <Fragment>
      <div className={classNames('siteRoot', className)}>
        <Head>
          <title>TFCA</title>
          <meta charSet="utf-8" />
          <link href="/favicon.ico" rel="icon" />
        </Head>
        <div className="siteContent">
          {children}
          <CookieConsent expires={60} />
        </div>
      </div>
    </Fragment>
  )
}

export default Template
