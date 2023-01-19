require('../../../styles/override-ant-globals.less')

import classNames from 'classnames'
import Head from 'next/head'
import React, { Fragment } from 'react'

import { CookieConsent } from '../../CookieConsent'
import { TopBar } from '../TopBar'

export const Template = ({ children, className, presetUid, withTopbar }) => {
  return (
    <Fragment>
      <div className={classNames('siteRoot', className)}>
        <Head>
          <title>TFCA</title>
          <meta charSet="utf-8" />
          <link href="/favicon.ico" rel="icon" />
        </Head>
        {withTopbar && <TopBar />}
        <div className="siteContent">
          {children}
          <CookieConsent presetUid={presetUid} />
        </div>
      </div>
    </Fragment>
  )
}
