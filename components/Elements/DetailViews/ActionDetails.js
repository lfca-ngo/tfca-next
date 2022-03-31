require('./actionDetails.less')

import { ShareAltOutlined } from '@ant-design/icons'
import { Button, Space } from 'antd'
import Image from 'next/image'
import React from 'react'

import CallToAction from '../CallToAction'
import { ListSection, TextSection } from '../Sections'

export const ActionDetails = ({ item }) => {
  return (
    <div className="detail-view action">
      <div className="hero-image">
        <Image height={304} src={item.hero?.url} width={665} />
      </div>

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
