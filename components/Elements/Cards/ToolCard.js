require('./toolCard.less')

import { CheckCircleOutlined } from '@ant-design/icons'
import { Button, Card, List } from 'antd'
import Image from 'next/image'
import React from 'react'

import { text } from '../../../utils/Text'

export const ToolCard = ({ item, onNext }) => {
  const handleNext = () => onNext(item)

  return (
    <Card className="content-card tool" onClick={handleNext}>
      <div className="header">
        <div className="logo">
          <Image layout="fill" objectFit="contain" src={item.logo?.url} />
        </div>
        <div className="desc">
          <div className="name">{item.name}</div>
          <div className="title">{item.title}</div>
        </div>
      </div>
      <div className="body-content">
        <div className="benefits">
          <List
            className="simple-list"
            dataSource={item?.benefitsCollection?.items}
            renderItem={(item) => (
              <List.Item>
                <List.Item.Meta
                  avatar={<CheckCircleOutlined />}
                  description={text(item.value)}
                />
              </List.Item>
            )}
          />
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
