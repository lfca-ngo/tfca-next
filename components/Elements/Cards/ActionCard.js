require('./actionCard.less')

import { ArrowRightOutlined } from '@ant-design/icons'
import { Button, Card, Tag } from 'antd'
import Image from 'next/image'
import React from 'react'

import { text } from '../../../utils/Text'

export const ActionCard = ({ item, onNext }) => {
  const actionIcons =
    item.actionsCollection?.items?.map((action) => action?.icon?.url) || []

  const handleNext = () => onNext(item)

  console.log(actionIcons)
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
          <Button className="no-padding" onClick={handleNext} type="link">
            Details
            <ArrowRightOutlined />
          </Button>
        </div>
      </footer>
    </Card>
  )
}
