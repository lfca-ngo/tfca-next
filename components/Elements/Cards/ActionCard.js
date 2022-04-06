require('./actionCard.less')

import { Card, Tag } from 'antd'
import Image from 'next/image'
import React from 'react'

import { DetailButton } from './DetailButton'

export const ActionCard = ({ item, onNext }) => {
  const actionIcons =
    item.actionsCollection?.items?.map((action) => action?.icon?.url) || []

  const handleNext = () => onNext(item)

  return (
    <Card className="content-card action" onClick={handleNext}>
      <header>
        <div className="text">
          <div className="title">{item.name}</div>
          <div className="description">{item.shortDescription}</div>
        </div>

        <div className="hero-image">
          <Image layout="fill" objectFit="cover" src={item.hero?.url} />
        </div>
      </header>
      <main></main>
      <footer>
        <div className="actions">
          {actionIcons
            .filter((i) => i)
            .map((iconUrl, i) => (
              <Tag className="action-tag" key={`icon-${i}`}>
                <Image
                  height={20}
                  layout="fixed"
                  objectFit="contain"
                  src={iconUrl}
                  width={20}
                />
              </Tag>
            ))}
        </div>
        <div className="details">
          <DetailButton onClick={handleNext} text={'Details'} />
        </div>
      </footer>
    </Card>
  )
}
