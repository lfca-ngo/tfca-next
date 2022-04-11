require('./styles.less')

import { RocketFilled } from '@ant-design/icons'
import { Button, Drawer } from 'antd'
import classNames from 'classnames'
import { useRouter } from 'next/router'
import React, { useState } from 'react'

import { useCustomization } from '../../../hooks'
import { getCookie, getWindowUid, UID_COOKIE_NAME } from '../../../utils'
import { LoadingSpinner } from '../../Elements'
import { Share } from '../../Share'

export const ChallengeStatus = ({ className, openGraphInfo }) => {
  const [open, setOpen] = useState(false)
  const [isGeneratingToken, setIsGeneratingToken] = React.useState(false)
  const [error, setError] = useState('')
  const [invite, setInvite] = React.useState(null)

  const customization = useCustomization()
  const { locale, query } = useRouter()

  const createInvite = async () => {
    setOpen(true)
    setError('')
    setIsGeneratingToken(true)
    // Gereate the share token
    try {
      const response = await fetch('/api/create-shareable-link', {
        body: JSON.stringify({
          actionCollectionSlug: query.actionCollectionSlug || '',
          locale,
          socialDescription: openGraphInfo?.ogdescription,
          socialImage: openGraphInfo?.ogimage?.url,
          socialTitle: openGraphInfo?.ogtitle,
          uid: getCookie(UID_COOKIE_NAME) || getWindowUid(),
        }),
        headers: {
          'Content-Type': 'application/json',
        },
        method: 'POST',
      })

      const { ogImageUrl, shortLink } = await response.json()
      setInvite({
        names: null,
        ogImageUrl,
        shortLink,
      })
    } catch (e) {
      setError('Failed to generate link')
    }
    setIsGeneratingToken(false)
  }

  return (
    <div className={classNames('challenge-status', className)}>
      <div className="status-icon">
        <RocketFilled />
      </div>
      <div className="invited-by">
        {customization?.sender ? (
          <>
            <label>Invited by</label>
            <div className="invited-by-text">{customization.sender}</div>
          </>
        ) : (
          <>
            <label>Invite</label>
            <div className="invited-by-text">friends</div>
          </>
        )}
      </div>
      <Button onClick={createInvite} type="primary">
        Invite
      </Button>

      <Drawer
        className={`drawer-md`}
        onClose={() => setOpen(!open)}
        visible={open}
      >
        {error ? (
          <h3>{error}</h3>
        ) : (
          <div>
            {isGeneratingToken ? (
              <LoadingSpinner className="dark" label="...generating link" />
            ) : (
              <Share invites={[invite]} />
            )}
          </div>
        )}
      </Drawer>
    </div>
  )
}
