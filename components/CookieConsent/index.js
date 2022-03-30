require('./styles.less')

import { Button, Col, Row } from 'antd'
import { motion } from 'framer-motion'
import React, { useEffect, useState } from 'react'

import { useContent } from '../../hooks'
import {
  ANALYTICS_CONSENT_COOKIE_NAME,
  getCookie,
  getWindowUid,
  setCookie,
  UID_COOKIE_NAME,
} from '../../utils'
import { text } from '../../utils/Text'
import { ConditionalWrapper, CookieSelector } from './helpers'

const CookieConsent = () => {
  const cookieBanner = useContent()?.metaData?.cookieBanner
  // We assume that the first cookie is required and always needs to be accepted
  const requiredCookie = cookieBanner?.levelsCollection?.items?.[0]?.key

  // We show the banner when the required cookie has not been accepted, yet
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const isNewUser = !getCookie(requiredCookie)

    // show consent banner if needed
    if (isNewUser) {
      setTimeout(() => {
        setVisible(true)
      }, 1000)
    }
  }, [requiredCookie])

  const [cookiesState, setCookiesState] = useState(
    requiredCookie ? { [requiredCookie]: true } : {}
  )

  const accept = (all = false) => {
    if (all) {
      // Accept all cookies
      cookieBanner?.levelsCollection?.items?.forEach((cookie) => {
        setCookie(cookie.key, true)
      })
    } else {
      // Accept only selected cookies
      Object.keys(cookiesState).forEach((key) => {
        if (cookiesState[key]) {
          setCookie(key, true)
        }
      })
    }

    // Set the uid cookie if we are allowed to
    const uid =
      all || cookiesState[ANALYTICS_CONSENT_COOKIE_NAME] ? getWindowUid() : ''
    setCookie(UID_COOKIE_NAME, uid)

    setVisible(false)
  }

  if (!visible) return null

  return (
    <ConditionalWrapper
      condition={false}
      wrapper={(children) => <div className="cookie-overlay">{children}</div>}
    >
      <motion.div
        animate="visible"
        className="cookie-consent-banner"
        initial="hidden"
        transition={{ duration: 1, ease: 'easeInOut' }}
        variants={{
          hidden: { opacity: 0 },
          visible: { opacity: 1 },
        }}
      >
        <div className="cookie-content">
          <div className="title">{cookieBanner?.title}</div>
          <div className="description">{text(cookieBanner?.body)}</div>
          <div className="consent">
            <ul>
              {cookieBanner?.levelsCollection?.items.map((level, i) => {
                return (
                  <CookieSelector
                    // The first cookie is required and can't be changed
                    disabled={i === 0}
                    infoBox={cookieBanner?.infoboxStats}
                    isActive={!!cookiesState[level.key]}
                    key={level.key}
                    showInfo={i > 0}
                    title={<div className="text-wrapper">{level.value}</div>}
                    toggleValue={(checked) => {
                      setCookiesState((s) => ({
                        ...s,
                        [level.key]: checked,
                      }))
                    }}
                  />
                )
              })}
            </ul>
          </div>
        </div>

        <Row className="btn-wrapper" gutter={10}>
          <Col xs={12}>
            <Button
              block
              key="acceptButton"
              onClick={() => accept(true)}
              size="large"
              type="primary"
            >
              {cookieBanner?.acceptButton}
            </Button>
          </Col>
          <Col xs={12}>
            <Button
              block
              ghost
              key="declineButton"
              onClick={() => accept()}
              size="large"
              type="primary"
            >
              {cookieBanner?.denyButton}
            </Button>
          </Col>
        </Row>
      </motion.div>
    </ConditionalWrapper>
  )
}

export default CookieConsent
