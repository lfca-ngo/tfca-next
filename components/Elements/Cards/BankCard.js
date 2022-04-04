require('./bankCard.less')

import { CheckCircleOutlined } from '@ant-design/icons'
import { Button, Card, List } from 'antd'
import Image from 'next/image'
import React, { useState } from 'react'

import { text } from '../../../utils/Text'

export const BankCard = ({ blocks, item, onNext }) => {
  const TABS_LIST = [
    {
      key: 'benefitsCollection',
      tab: text(blocks['label.benefits']),
    },
    {
      key: 'sustainabilityCollection',
      tab: text(blocks['label.sustainability']),
    },
  ]

  const [activeTab, setActiveTab] = useState(TABS_LIST[0].key)

  const handleNext = () => onNext(item)

  return (
    <Card
      activeTabKey={activeTab}
      className="content-card bank"
      onTabChange={(key) => {
        setActiveTab(key)
      }}
      tabList={TABS_LIST}
      tabProps={{ centered: true }}
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
          Show details
        </Button>
      </div>
    </Card>
  )
}
