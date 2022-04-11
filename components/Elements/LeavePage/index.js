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
import { text } from '../../../utils/Text'

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
  const leavePageMissingLink = text(useContentBlocks('leavepage.missing.link'))
  const leavePageTitle = text(useContentBlocks('leavepage.title'))
  const leavePageHint = text(useContentBlocks('leavepage.hint'))
  const leavePageButtonPrimary = text(
    useContentBlocks('leavepage.button.primary')
  )
  const leavePageButtonHint = text(useContentBlocks('leavepage.button.hint'))

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
        <Space direction="vertical" style={{ width: '100%' }}>
          <Button
            block
            ghost
            icon={<LikeOutlined />}
            onClick={onNext}
            type="primary"
          >
            {leavePageButtonPrimary}
          </Button>
          <a href={destinationUrl} rel="noopener noreferrer" target="_blank">
            <Button
              block
              icon={<LinkOutlined />}
              onClick={handleClick}
              type="primary"
            >
              {destination}
            </Button>
          </a>
          <label className="hint">{leavePageButtonHint}</label>
        </Space>
      </div>
    </div>
  )
}
