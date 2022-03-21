require('./politicianCard.less')

import { Button, Card, Tag } from 'antd'
import React from 'react'

import IconEurope from '../../../assets/icons/eu.svg'
import IconGermany from '../../../assets/icons/germany.svg'
import { CircleImage } from '../CircleImage'

const MAP_PARLIAMENT = {
  DE: {
    icon: <IconGermany />,
    name: 'Deutscher Bundestag',
  },
  EU: {
    icon: <IconEurope />,
    name: 'European Parliament',
  },
}

export const PoliticianCard = ({ item, onNext }) => {
  const handleNext = onNext ? () => onNext(item) : undefined
  const parliamentInfo = MAP_PARLIAMENT[item?.parliament]

  return (
    <Card className="politician-card" onClick={() => onNext && onNext(item)}>
      <header>
        <div className="image">
          <CircleImage size={65} src={item.imageUrl} />
        </div>

        <div className="info">
          <div className="name">{item.name}</div>
          <div className="parliament">
            <div className="icon">{parliamentInfo?.icon}</div>
            <div className="name">{parliamentInfo?.name}</div>
          </div>
        </div>
      </header>

      <div className="desc">
        {item.tags.map((tag) => (
          <Tag className="base-tag lila" key={tag}>
            {tag}
          </Tag>
        ))}
      </div>

      <div className="actions">
        {handleNext && (
          <Button
            className="button"
            onClick={handleNext}
            size="small"
            type="primary"
          >
            Select
          </Button>
        )}
      </div>
    </Card>
  )
}
