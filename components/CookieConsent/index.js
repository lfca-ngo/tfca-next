require('./styles.less')

import { Button, Col, Row } from 'antd'
import { motion } from 'framer-motion'
import React, { useEffect, useState } from 'react'
import { useCookies } from 'react-cookie'
import { v4 as uuidv4 } from 'uuid'

import { useContent } from '../../hooks/useTranslation'
import {
  CONSENT_COOKIE,
  INTERNAL_COOKIE,
  isBrowser,
  SAME_SITE_OPTIONS,
} from '../../utils'
import { text } from '../../utils/Text'
import { ConditionalWrapper, CookieSelector } from './helpers'

const INITIAL_COOKIE_STATE = {
  [`cookies.marketing`]: {
    value: false,
  },
  [`cookies.statistical`]: {
    showInfo: true,
    value: false,
  },
  [`cookies.technical`]: {
    disabled: true,
    value: true,
  },
}

const CookieConsent = (props) => {
  const cookieBanner = useContent()?.metaData?.cookieBanner
  const [visible, setVisible] = useState(false)
  const [cookiesState, setCookiesState] = useState(INITIAL_COOKIE_STATE)

  const setCookieState = (id, isActive) => {
    const newState = { ...cookiesState }
    newState[id].value = isActive
    setCookiesState(newState)
  }

  const [cookies, setReactCookie] = useCookies()

  const accept = () => {
    setCookie(CONSENT_COOKIE, 'true')
    setCookie(INTERNAL_COOKIE, window.ui || uuidv4())
    setVisible(false)
  }

  const decline = () => {
    setCookie(CONSENT_COOKIE, 'false')
    setVisible(false)
  }

  const setCookie = (cookieName, cookieValue) => {
    const { expires, extraCookieOptions, sameSite } = props
    const expiresDays = 1000 * 60 * 60 * 24 * expires
    const expiresFromNow = new Date(new Date().valueOf() + expiresDays)
    let { cookieSecurity } = props

    if (cookieSecurity === undefined && isBrowser()) {
      cookieSecurity = window.location
        ? window.location.protocol === 'https:'
        : true
    }

    const cookieOptions = {
      expires: expiresFromNow,
      ...extraCookieOptions,
      sameSite: sameSite || SAME_SITE_OPTIONS.LAX,
      secure: cookieSecurity,
    }

    setReactCookie(cookieName, cookieValue, cookieOptions)
  }

  const getCookieValue = (cookieName) => {
    let cookieValue = cookies[cookieName]

    return cookieValue
  }

  const variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  }

  // cookie states to handle
  const isNewUser = getCookieValue(CONSENT_COOKIE) === undefined || props.debug
  const hasDeniedCookies = getCookieValue(CONSENT_COOKIE) === 'false'

  useEffect(() => {
    // if the user has already an accept cookie set, do nothing
    // if the user has already a decline cookie set, create a uuid
    // and expose via window variable
    if (hasDeniedCookies || isNewUser) {
      const uuid = uuidv4()
      window[INTERNAL_COOKIE] = uuid
    }

    // show consent banner: if the user accepts,
    // use the window uuid to set the cookie
    if (isNewUser) {
      setTimeout(() => {
        setVisible(true)
      }, 1000)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

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
        variants={variants}
      >
        <div className="cookie-content">
          <div className="title">{cookieBanner?.title}</div>
          <div className="description">{text(cookieBanner?.body)}</div>
          <div className="consent">
            <ul>
              {cookieBanner?.levelsCollection?.items.map((level, i) => {
                return (
                  <CookieSelector
                    disabled={cookiesState[level.key].disabled}
                    infoBox={cookieBanner?.infoboxStats}
                    isActive={cookiesState[level.key].value}
                    key={`level-${i}`}
                    showInfo={cookiesState[level.key].showInfo}
                    title={<div className="text-wrapper">{level.value}</div>}
                    toggleValue={(checked) =>
                      setCookieState(level.key, checked)
                    }
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
              onClick={() => {
                accept()
              }}
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
              onClick={() => {
                decline()
              }}
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
