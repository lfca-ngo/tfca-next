require('./bankCard.less')

import { CheckCircleOutlined } from '@ant-design/icons'
import { Button, Card, List } from 'antd'
import Image from 'next/image'
import React, { useState } from 'react'

import { text } from '../../../utils/Text'

const TABS_LIST = [
  {
    key: 'benefitsCollection',
    tab: 'Benefits',
  },
  {
    key: 'sustainabilityCollection',
    tab: 'Sustainability',
  },
]

export const BankCard = ({ item, onNext }) => {
  const [activeTab, setActiveTab] = useState(TABS_LIST[0].key)

  const handleNext = () => onNext(item)

  return (
    <Card
      activeTabKey={activeTab}
      className="bank-card"
      onTabChange={(key) => {
        setActiveTab(key)
      }}
      tabList={TABS_LIST}
      title={
        <header>
          <div className="logo">
            <Image height={117} src={item?.logo?.url} width={221} />
          </div>

          <div className="tags">
            {item.tagsCollection?.items?.map((tag, i) => (
              <div className="tag-wrapper" key={`tag-${i}`}>
                <Image height={28} src={tag?.icon?.url} width={49} />
              </div>
            ))}
          </div>
        </header>
      }
    >
      <List
        className="simple-list summary"
        dataSource={item[activeTab].items}
        renderItem={(item) => (
          <List.Item>
            <List.Item.Meta
              avatar={<CheckCircleOutlined />}
              description={text(item.value)}
            />
          </List.Item>
        )}
      />

      <div className="actions">
        <Button block onClick={handleNext} type="primary">
          Details
        </Button>
      </div>
    </Card>
  )
}
