require('./leavePage.less')

import {
  ExclamationCircleOutlined,
  LikeOutlined,
  LinkOutlined,
} from '@ant-design/icons'
import { Button, Space } from 'antd'
import React from 'react'

export const LeavePage = ({ destination, destinationUrl, onNext }) => {
  if (!destinationUrl)
    return (
      <span>
        Upps, we are missing a link. Please report this item to{' '}
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
        <div className="title">Before you leave</div>
        <div className="description">
          {`Making your actions count helps motivate others to follow. So make
          sure to return and click the "Count me in" button!`}
        </div>
        <Space direction="vertical" style={{ width: '100%' }}>
          <Button
            block
            ghost
            icon={<LikeOutlined />}
            onClick={onNext}
            type="primary"
          >
            Count me in
          </Button>
          <a href={destinationUrl} rel="noopener noreferrer" target="_blank">
            <Button
              block
              icon={<LinkOutlined />}
              onClick={onNext}
              type="primary"
            >
              {destination}
            </Button>
          </a>
          <label className="hint">The link will open in a new window</label>
        </Space>
      </div>
    </div>
  )
}
