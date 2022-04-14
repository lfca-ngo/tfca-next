require('./styles.less')

import {
  ExclamationCircleOutlined,
  LikeOutlined,
  LinkOutlined,
} from '@ant-design/icons'
import { Button, Space } from 'antd'
import React from 'react'

import { useAnalytics, useContentBlocks } from '../../../hooks'
import { EXTERNAL_LINK_CLICKED } from '../../../services/analytics'
import { textBlockToString } from '../../../utils'

export const LeavePage = ({
  actionId,
  destination,
  destinationUrl,
  onNext,
}) => {
  const { trackEvent } = useAnalytics()

  const handleClick = () => {
    trackEvent({
      name: EXTERNAL_LINK_CLICKED,
      values: {
        action_id: actionId,
        destination_text: destination,
        destination_url: destinationUrl,
      },
    })
  }
  const leavePageMissingLink = textBlockToString(
    useContentBlocks('leavepage.missing.link')
  )
  const leavePageTitle = textBlockToString(useContentBlocks('leavepage.title'))
  const leavePageHint = textBlockToString(useContentBlocks('leavepage.hint'))
  const leavePageButtonPrimary = textBlockToString(
    useContentBlocks('leavepage.button.primary')
  )
  const leavePageButtonHint = textBlockToString(
    useContentBlocks('leavepage.button.hint')
  )

  if (!destinationUrl)
    return (
      <span>
        {leavePageMissingLink}
        <a
          href="mailto:support@lfca.earth"
          rel="noopener noreferrer"
          target="_blank"
        >
          support@lfca.earth
        </a>
        !
      </span>
    )
  return (
    <div className="leave-page">
      <ExclamationCircleOutlined className="headline-icon" />
      <div className="content">
        <div className="title">{leavePageTitle}</div>
        <div className="description">{leavePageHint}</div>
        <label className="hint">{leavePageButtonHint}</label>
        <Space direction="vertical" style={{ width: '100%' }}>
          <a
            href={`${destinationUrl}?ref=tfca`}
            rel="noopener noreferrer"
            target="_blank"
          >
            <Button
              block
              icon={<LinkOutlined />}
              onClick={handleClick}
              type="primary"
            >
              {destination}
            </Button>
          </a>
          <Button
            block
            className="colored"
            ghost
            icon={<LikeOutlined />}
            onClick={onNext}
            type="primary"
          >
            {leavePageButtonPrimary}
          </Button>
        </Space>
      </div>
    </div>
  )
}
