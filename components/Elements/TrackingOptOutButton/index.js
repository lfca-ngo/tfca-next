import { Button } from 'antd'
import React, { useState } from 'react'

import {
  ANALYTICS_CONSENT_COOKIE_NAME,
  deleteCookie,
  getCookie,
  UID_COOKIE_NAME,
} from '../../../utils'

export const TrackingOptOutButton = ({ label = 'Opt out from analytics' }) => {
  const [uid, setUid] = useState(getCookie(UID_COOKIE_NAME))

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
