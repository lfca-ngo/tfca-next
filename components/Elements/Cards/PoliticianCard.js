require('./politicianCard.less')

import { Button, Card, Tag } from 'antd'
import React from 'react'

export const PoliticianCard = ({ item, onNext }) => {
  const handleNext = onNext ? () => onNext(item) : undefined

  return (
    <Card className="politician-card" onClick={() => onNext(item)}>
      <img className="image" src={item.imageUrl} />

      <div>
        <div className="name">{item.name}</div>
        <Tag className="base-tag lila">{item.sub}</Tag>
      </div>

      {handleNext && (
        <Button className="button" onClick={handleNext} type="primary">
          Select
        </Button>
      )}
    </Card>
  )
}
