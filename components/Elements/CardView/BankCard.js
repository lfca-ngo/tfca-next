require('./bankCard.less')

import { CheckCircleOutlined } from '@ant-design/icons'
import { Button, Card, List } from 'antd'
import Image from 'next/image'
import React, { useState } from 'react'

import { textBlockToString } from '../../../utils'

export const BankCard = ({ blocks, item, onNext }) => {
  const TABS_LIST = [
    {
      key: 'benefits',
      tab: textBlockToString(blocks['label.benefits']),
    },
    {
      key: 'sustainability',
      tab: textBlockToString(blocks['label.sustainability']),
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
            {item.tags?.map((tag, i) => (
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
        dataSource={item[activeTab]}
        renderItem={(item) => (
          <List.Item>
            <List.Item.Meta
              avatar={<CheckCircleOutlined />}
              description={textBlockToString(item.value)}
            />
          </List.Item>
        )}
      />

      <div className="actions">
        <Button block onClick={handleNext} type="primary">
          {textBlockToString(blocks['results.button.details'])}
        </Button>
      </div>
    </Card>
  )
}
