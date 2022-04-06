require('./actionDetails.less')

import { ShareAltOutlined } from '@ant-design/icons'
import { Button, Space } from 'antd'
import React from 'react'

import CallToAction from '../CallToAction'
import { ListSection, TextSection } from '../Sections'

export const ActionDetails = ({ item, onNext }) => {
  return (
    <div className="detail-view action">
      <header>
        <div className="title">{item.name}</div>
        <div className="actions">
          <Button icon={<ShareAltOutlined />} shape="round" type="primary" />
        </div>
      </header>

      <TextSection text={item?.shortDescription} title="Description" />

      <ListSection
        items={item?.reasonsCollection?.items}
        title="Why should I do this?"
      />

      <TextSection text={item?.description} title="How to do this" />

      <Space direction="vertical" style={{ width: '100%' }}>
        {item?.actionsCollection?.items?.map((action, i) => (
          <CallToAction
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
