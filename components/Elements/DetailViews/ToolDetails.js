require('./toolDetails.less')

import { CheckOutlined, PlusCircleOutlined } from '@ant-design/icons'
import { Divider, List } from 'antd'
import Image from 'next/image'
import React from 'react'

import { Text, text } from '../../../utils/Text'
import CallToAction from '../CallToAction'

export const ToolDetails = ({ item }) => {
  return (
    <div className="detail-view tool">
      <header>
        <div className="logo-wrapper">
          <Image layout="fill" objectFit="contain" src={item.logo?.url} />
        </div>
        <div className="content">
          <div className="name">{item.name}</div>
          <div className="title">{item.title}</div>
          <Divider />
          <div className="actions">
            {item?.actionsCollection?.items?.map((action, i) => (
              <CallToAction key={`action-${i}`} showLeaveModal {...action} />
            ))}
          </div>
        </div>
      </header>

      <main>
        <div className="activities">
          <div className="section-title title">
            <PlusCircleOutlined />
            Benefits
          </div>

          <List
            className="simple-list"
            dataSource={item?.benefitsCollection?.items}
            renderItem={(item) => (
              <List.Item>
                <List.Item.Meta
                  avatar={<CheckOutlined />}
                  description={text(item.value)}
                />
              </List.Item>
            )}
          />
        </div>
        <div>
          <div className="section-title title">
            <PlusCircleOutlined />
            How it works
          </div>
          <div className="screen">
            <Image
              height={360}
              layout="responsive"
              objectFit="contain"
              src={item.hero?.url}
              width={665}
            />
          </div>
        </div>

        <div className="description">
          <div className="section-title title">
            <PlusCircleOutlined />
            About
          </div>
          <Text block={item?.description} />
        </div>
      </main>
    </div>
  )
}
