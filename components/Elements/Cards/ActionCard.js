require('./actionCard.less')

import { Button, Card, Tag } from 'antd'
import React from 'react'

import { Text, text } from '../../../utils/Text'

const ActionCard = ({ item, onNext }) => {
  const levelTags =
    item.levelsCollection?.items?.map((level) => text(level.value)) || []
  const typeTags =
    item.tagsCollection?.items?.map((tag) => text(tag.value)) || []

  return (
    <Card className="action-card">
      <div className="body-content">
        <div className="icon">
          <img src={item.icon?.url} />
        </div>
        <div className="text">
          <div className="title">{item.name}</div>
          <div className="tags">
            {levelTags?.map((tag, index) => (
              <Tag className="base-tag" color="gold" key={index}>
                {tag}
              </Tag>
            ))}
            {typeTags?.map((tag, index) => (
              <Tag className="base-tag" color="blue" key={index}>
                {tag}
              </Tag>
            ))}
          </div>
        </div>
      </div>
      <div className="actions">
        <Button onClick={() => onNext(item)} type="primary">
          Details
        </Button>
      </div>
    </Card>
  )
}

export default ActionCard
