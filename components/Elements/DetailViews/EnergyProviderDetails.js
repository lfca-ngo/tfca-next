require('./energyProviderDetails.less')

import {
  CheckOutlined,
  PlusCircleOutlined,
  ShareAltOutlined,
} from '@ant-design/icons'
import { Button, List, Space } from 'antd'
import Image from 'next/image'
import React from 'react'

import { Text, text } from '../../../utils/Text'
import CallToAction from '../CallToAction'

export const EnergyProviderDetails = ({ item }) => {
  return (
    <div className="detail-view energy-provider">
      <div className="header">
        <div className="text">
          <div className="title">{item.name}</div>
          <div className="description">
            <Text block={item?.description} />
          </div>
        </div>

        <div className="info-wrapper">
          <div className="logo-wrapper">
            <Image
              height={100}
              layout="intrinsic"
              src={item.logo?.url}
              width={100}
            />
          </div>
          <div className="actions">
            <Space direction="vertical" style={{ width: '100%' }}>
              <Button
                block
                icon={<ShareAltOutlined />}
                shape="round"
                type="primary"
              />
            </Space>
          </div>
        </div>
      </div>

      <div className="benefits">
        <div className="section-title title">
          <PlusCircleOutlined />
          Benefits
        </div>

        <List
          className="simple-list white"
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

      <CallToAction
        block
        text="Visit provider"
        type="primary"
        url={`https://google.de`}
      />
    </div>
  )
}
