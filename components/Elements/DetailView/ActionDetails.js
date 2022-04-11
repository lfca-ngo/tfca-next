require('./actionDetails.less')

import { ShareAltOutlined } from '@ant-design/icons'
import { Button, Space } from 'antd'
import React from 'react'

import { textBlockToString } from '../../../utils'
import { CallToAction } from '../CallToAction'
import { ListSection, TextSection } from '../Sections'

export const ActionDetails = ({ actionId, blocks, item, onNext }) => {
  return (
    <div className="detail-view action">
      <header>
        <div className="title">{item.name}</div>
        <div className="actions">
          <Button icon={<ShareAltOutlined />} shape="round" type="primary" />
        </div>
      </header>

      <TextSection
        text={item?.shortDescription}
        title={textBlockToString(blocks['details.description.label'])}
      />

      <ListSection
        items={item?.reasons}
        title={textBlockToString(blocks['details.why.label'])}
      />

      <TextSection
        text={item?.description}
        title={textBlockToString(blocks['details.how.label'])}
      />

      <Space direction="vertical" style={{ width: '100%' }}>
        {item?.actions?.map((action, i) => (
          <CallToAction
            actionId={actionId}
            key={`action-${i}`}
            onCountMeIn={onNext}
            showLeaveModal
            {...action}
            block
            ghost={false}
          />
        ))}
      </Space>
    </div>
  )
}
