require('./actionCard.less')

import { Button, Card, Tag } from 'antd'
import React from 'react'

import { text } from '../../../utils/Text'

export const ActionCard = ({ item, onNext }) => {
  const levelTags =
    item.levelsCollection?.items?.map((level) => text(level.value)) || []
  const typeTags =
    item.tagsCollection?.items?.map((tag) => text(tag.value)) || []

  const handleNext = () => onNext(item)

  return (
    <Card className="action-card" onClick={handleNext}>
      <div>
        <div className="title">{item.name}</div>
        <div className="tags">
          {levelTags?.map((tag, index) => (
            <Tag className="base-tag lila" key={index}>
              {tag}
            </Tag>
          ))}
          {typeTags?.map((tag, index) => (
            <Tag className="base-tag blue" key={index}>
              {tag}
            </Tag>
          ))}
        </div>
      </div>
      <div className="body-content">
        <div className="hero-image">
          <img src={item.hero?.url} />
        </div>
        <div className="actions">
          <Button onClick={handleNext} type="primary">
            Details
          </Button>
        </div>
      </div>
    </Card>
  )
}
