import { Button } from 'antd'
import React, { useEffect, useState } from 'react'

import {
  ANALYTICS_CONSENT_COOKIE_NAME,
  deleteCookie,
  getCookie,
  UID_COOKIE_NAME,
} from '../../../utils'

export const TrackingOptOutButton = ({ label = 'Opt out from analytics' }) => {
  const [uid, setUid] = useState(null)

  // We need to set this to open with a useEffect in orde to keep the server and client HTML in sync
  // See: https://github.com/vercel/next.js/discussions/17443#discussioncomment-87097
  useEffect(() => {
    setUid(getCookie(UID_COOKIE_NAME))
  }, [])

  return (
    uid && (
      <span>
        <Button
          onClick={() => {
            deleteCookie(ANALYTICS_CONSENT_COOKIE_NAME)
            deleteCookie(UID_COOKIE_NAME)
            setUid(null)
          }}
          size="small"
        >
          {label}
        </Button>{' '}
        {`(${uid})`}
      </span>
    )
  )
}
