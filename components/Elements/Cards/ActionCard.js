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
      <div className="icon">
        <img src={item.icon?.url} />
      </div>
      <div className="text">
        <Card.Meta title={item.name} />
        <div className="tags">
          {levelTags?.map((tag, index) => (
            <Tag color="gold" key={index}>
              {tag}
            </Tag>
          ))}
          {typeTags?.map((tag, index) => (
            <Tag color="blue" key={index}>
              {tag}
            </Tag>
          ))}
        </div>
      </div>
      <div className="actions">
        <Button onClick={() => onNext(item)} size="small" type="primary">
          Details
        </Button>
      </div>
    </Card>
  )
}

export default ActionCard
