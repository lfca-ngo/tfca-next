require('./styles.less')

import { QuestionCircleOutlined } from '@ant-design/icons'
import Icon from '@ant-design/icons'
import { Button, Col, Popover, Row } from 'antd'
import { motion } from 'framer-motion'
// import { initializeAndTrack } from 'gatsby-plugin-gdpr-cookies'
// import { defaultOptions } from 'gatsby-plugin-gdpr-cookies/default-options'
import React, { useEffect, useState } from 'react'
import { useCookies } from 'react-cookie'

import IconCheck from '../../assets/icons/c-check.svg'
import IconRemove from '../../assets/icons/c-remove.svg'
import { useContent } from '../../hooks/useTranslation'
import { isBrowser, renderAsHtml } from '../../utils'

export const SAME_SITE_OPTIONS = {
  LAX: 'lax',
  NONE: 'none',
  STRICT: 'strict',
}

const ConditionalWrapper = ({ children, condition, wrapper }) => {
  return condition ? wrapper(children) : children
}

const CookieSelector = (props) => {
  return (
    <li className={props.isActive ? 'active' : ''}>
      <div>
        <Icon
          component={props.isActive ? IconCheck : IconRemove}
          onClick={() => !props.disabled && props.toggleValue(!props.isActive)}
        />{' '}
        {props.title}
        {props.showInfo && (
          <Popover content={props.infoBox} overlayClassName={'simple-popover'}>
            <QuestionCircleOutlined className="add-info" />
          </Popover>
        )}
      </div>
    </li>
  )
}

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
  const gaCookieName = 'ga_cookie' // defaultOptions.googleAnalytics.cookieName
  const fbCookieName = 'fb_cookie' // defaultOptions.facebookPixel.cookieName
  const [visible, setVisible] = useState(false)
  const [cookiesState, setCookiesState] = useState(INITIAL_COOKIE_STATE)

  const setCookieState = (id, isActive) => {
    const newState = { ...cookiesState }
    newState[id].value = isActive
    setCookiesState(newState)
  }

  const [cookies, setReactCookie] = useCookies()

  useEffect(() => {
    const { debug } = props

    if (getCookieValue(gaCookieName) === undefined || debug) {
      setTimeout(() => {
        setVisible(true)
      }, 1000)
    }
  }, [])

  /**
   * Set a persistent accept cookie
   */
  const accept = () => {
    setCookie(gaCookieName, 'true')
    setCookie(fbCookieName, 'true')
    setVisible(false)
    // init tracking
    // initializeAndTrack(location)
  }

  /**
   * Set a persistent decline cookie
   */
  const decline = () => {
    setCookie(gaCookieName, 'false')
    setCookie(fbCookieName, 'false')
    setVisible(false)
    // init tracking
    // initializeAndTrack(location)
  }

  /**
   * Get the legacy cookie name by the regular cookie name
   * @param {string} name of cookie to get
   */
  const getLegacyCookieName = (name) => {
    return `${name}-legacy`
  }

  /**
   * Function to set the consent cookie based on the provided variables
   * Sets two cookies to handle incompatible browsers, more details:
   * https://web.dev/samesite-cookie-recipes/#handling-incompatible-clients
   */
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
      sameSite,
      secure: cookieSecurity,
    }

    // Fallback for older browsers where can not set SameSite=None, SEE: https://web.dev/samesite-cookie-recipes/#handling-incompatible-clients
    if (sameSite === SAME_SITE_OPTIONS.NONE) {
      setReactCookie(
        getLegacyCookieName(cookieName),
        cookieValue,
        cookieOptions
      )
    }

    // set the regular cookie
    setReactCookie(cookieName, cookieValue, cookieOptions)
  }

  /**
   * Returns the value of the consent cookie
   * Retrieves the regular value first and if not found the legacy one according
   * to: https://web.dev/samesite-cookie-recipes/#handling-incompatible-clients
   */
  const getCookieValue = (cookieName) => {
    let cookieValue = cookies[cookieName]

    // if the cookieValue is undefined check for the legacy cookie
    if (cookieValue === undefined) {
      cookieValue = cookies[getLegacyCookieName(cookieName)]
    }

    return cookieValue
  }

  // // If the bar shouldn't be visible don't render anything.
  if (!visible) {
    return null
  }

  const { disclaimer, title } = cookieBanner
  const buttonText = cookieBanner.acceptButton
  const declineButtonText = cookieBanner.denyButton

  const variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  }

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
          <div className="title">{title}</div>
          <div className="description">{disclaimer}</div>
          <div className="consent">
            <ul>
              {cookieBanner.levelsCollection?.items.map((level, i) => {
                return (
                  <CookieSelector
                    disabled={cookiesState[level.key].disabled}
                    infoBox={cookieBanner.infoboxStats}
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

        <Row className="btn-wrapper" gutter={16}>
          <Col xs={12}>
            <Button
              key="acceptButton"
              onClick={() => {
                accept()
              }}
              size="large"
              type="primary"
            >
              {buttonText}
            </Button>
          </Col>
          <Col xs={12}>
            <Button
              ghost
              key="declineButton"
              onClick={() => {
                decline()
              }}
              size="large"
              type="primary"
            >
              {declineButtonText}
            </Button>
          </Col>
        </Row>
      </motion.div>
    </ConditionalWrapper>
  )
}

export default CookieConsent
