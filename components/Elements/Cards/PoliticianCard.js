require('./politicianCard.less')

import { Button, Card, Tag } from 'antd'
import React from 'react'

export const PoliticianCard = ({ item, onSelect }) => {
  const handleSelect = onSelect ? () => onSelect(item) : undefined
  return (
    <Card className="politician-card" onClick={handleSelect}>
      <img className="image" src={item.imageUrl} />

      <div>
        <div className="name">{item.name}</div>
        {item.tags.map((tag) => (
          <Tag className="base-tag lila" key={tag}>
            {tag}
          </Tag>
        ))}
      </div>

      {handleSelect && (
        <Button className="button" onClick={handleSelect} type="primary">
          Select
        </Button>
      )}
    </Card>
  )
}
