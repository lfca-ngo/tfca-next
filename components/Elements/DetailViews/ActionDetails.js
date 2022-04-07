require('./actionDetails.less')

import { ShareAltOutlined } from '@ant-design/icons'
import { Button, Space } from 'antd'
import React from 'react'

import { text } from '../../../utils/Text'
import CallToAction from '../CallToAction'
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
        title={text(blocks['details.description.label'])}
      />

      <ListSection
        items={item?.reasonsCollection?.items}
        title={text(blocks['details.why.label'])}
      />

      <TextSection
        text={item?.description}
        title={text(blocks['details.how.label'])}
      />

      <Space direction="vertical" style={{ width: '100%' }}>
        {item?.actionsCollection?.items?.map((action, i) => (
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
