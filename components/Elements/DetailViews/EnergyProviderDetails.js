require('./energyProviderDetails.less')

import { ShareAltOutlined } from '@ant-design/icons'
import { Button, Space } from 'antd'
import Image from 'next/image'
import React from 'react'

import { Text } from '../../../utils/Text'
import CallToAction from '../CallToAction'
import { ListSection } from '../Sections'

export const EnergyProviderDetails = ({ item }) => {
  return (
    <div className="detail-view energy-provider">
      <header>
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
      </header>

      <ListSection items={item?.benefits} title="Benefits" />

      <CallToAction
        block
        showLeaveModal
        text="Visit provider"
        type="primary"
        url={`https://google.de`}
      />
    </div>
  )
}
