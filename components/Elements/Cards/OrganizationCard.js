require('./organizationCard.less')

import { Button, Card, Tag } from 'antd'
import Image from 'next/image'
import React from 'react'

import { text } from '../../../utils/Text'

export const OrganizationCard = ({ item, onNext }) => {
  const typeTags =
    item.tagsCollection?.items?.map((tag) => text(tag.value)) || []

  const handleNext = () => onNext(item)

  return (
    <Card className="content-card organization" onClick={handleNext}>
      <div className="header">
        <div className="title">{item.name}</div>
        <div className="logo">
          <Image layout="fill" objectFit="contain" src={item.logo?.url} />
        </div>
      </div>
      <div className="body-content">
        <div className="tags">
          {typeTags?.map((tag, index) => (
            <Tag className="base-tag blue" key={index}>
              {tag}
            </Tag>
          ))}
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
