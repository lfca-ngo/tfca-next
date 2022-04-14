require('./styles.less')

import { RocketFilled } from '@ant-design/icons'
import { Button, Drawer } from 'antd'
import classNames from 'classnames'
import { useRouter } from 'next/router'
import React, { useState } from 'react'

import { useContentBlocks, useCustomization } from '../../../hooks'
import { textBlockToString } from '../../../utils'
import { getCookie, getWindowUid, UID_COOKIE_NAME } from '../../../utils'
import { LoadingSpinner } from '../../Elements'
import { Share } from '../../Share'

export const ChallengeStatus = ({ className, openGraphInfo }) => {
  const [open, setOpen] = useState(false)
  const [isGeneratingToken, setIsGeneratingToken] = useState(false)
  const [error, setError] = useState('')
  const [invite, setInvite] = useState(null)

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

  const invitedByLabel = textBlockToString(
    useContentBlocks('challenge.status.invite.label')
  )
  const inviteLabel1 = textBlockToString(
    useContentBlocks('challenge.status.label1')
  )
  const inviteLabel2 = textBlockToString(
    useContentBlocks('challenge.status.label2')
  )
  const buttonLabel = textBlockToString(
    useContentBlocks('challenge.status.button')
  )
  const linkGenerationLabel = textBlockToString(
    useContentBlocks('challenge.status.create.link')
  )

  return (
    <div className={classNames('challenge-status', className)}>
      <div className="status-icon">
        <RocketFilled />
      </div>
      <div className="invited-by">
        {customization?.sender ? (
          <>
            <label>{invitedByLabel} </label>
            <div className="invited-by-text">{customization.sender}</div>
          </>
        ) : (
          <>
            <label>{inviteLabel1}</label>
            <div className="invited-by-text">{inviteLabel2}</div>
          </>
        )}
      </div>
      <Button onClick={createInvite} type="primary">
        {buttonLabel}
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
              <LoadingSpinner
                additionalSpinnerProps={{ type: 'home' }}
                className="dark"
                label={linkGenerationLabel}
              />
            ) : (
              <Share invites={[invite]} />
            )}
          </div>
        )}
      </Drawer>
    </div>
  )
}
