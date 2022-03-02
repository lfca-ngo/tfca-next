require('./actionDetails.less')

import { Col, Row, Tag } from 'antd'
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
      <h2>{item.name}</h2>
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
