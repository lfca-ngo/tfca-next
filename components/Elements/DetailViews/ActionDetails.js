require('./actionDetails.less')

import { ShareAltOutlined } from '@ant-design/icons'
import { Button, Col, Row, Tag } from 'antd'
import React from 'react'

import { Text, text } from '../../../utils/Text'
import CallToAction from '../CallToAction'

export const ActionDetails = ({ item }) => {
  console.log(item)
  const levelTags =
    item.levelsCollection?.items?.map((level) => text(level.value)) || []
  const areaTags =
    item.areasCollection?.items?.map((level) => text(level.value)) || []
  const tagsTags =
    item.tagsCollection?.items?.map((level) => text(level.value)) || []
  return (
    <div className="action-detail-view">
      <div className="hero">
        <img src={item.hero?.url} />
      </div>
      <div className="header">
        <div className="title">{item.name}</div>
        <div className="actions">
          <Button icon={<ShareAltOutlined />} shape="round" type="primary" />
        </div>
      </div>

      <div className="tags">
        {levelTags?.map((tag, index) => (
          <Tag className="base-tag" color="gold" key={index}>
            {tag}
          </Tag>
        ))}
        {areaTags?.map((tag, index) => (
          <Tag className="base-tag" color="blue" key={index}>
            {tag}
          </Tag>
        ))}
        {tagsTags?.map((tag, index) => (
          <Tag className="base-tag" color="blue" key={index}>
            {tag}
          </Tag>
        ))}
      </div>
      <Text block={item?.description} />

      {item?.actionsCollection?.items?.map((action, i) => (
        <CallToAction key={`action-${i}`} {...action} />
      ))}
    </div>
  )
}
