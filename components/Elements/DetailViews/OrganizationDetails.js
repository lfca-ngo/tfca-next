require('./organizationDetails.less')

import { PlusCircleOutlined, ShareAltOutlined } from '@ant-design/icons'
import { Button, Space, Tag } from 'antd'
import Image from 'next/image'
import React from 'react'

import { text } from '../../../utils/Text'
import CallToAction from '../CallToAction'
import { ListSection, TextSection } from '../Sections'
import { SocialIcons } from '../SocialIcons'

export const OrganizationDetails = ({ item }) => {
  const socials = [
    { id: 'Facebook', url: item.facebook },
    { id: 'Instagram', url: item.instagram },
    { id: 'Twitter', url: item.twitter },
    { id: 'Web', url: item.website },
  ]

  return (
    <div className="detail-view organization">
      <div className="header">
        <div className="text">
          <div className="title">{item.name}</div>
          <div className="vetted-by">
            {item?.vettedByCollection?.items?.map((item, i) => (
              <Tag className="vetted-by-org" key={`vetted-${i}`}>
                <Image
                  height={24}
                  layout="fixed"
                  src={item?.icon?.url}
                  width={24}
                />
                {text(item?.value)}
              </Tag>
            ))}
          </div>
        </div>

        <div className="info-wrapper">
          <div className="logo-wrapper">
            <Image
              height={70}
              objectFit="contain"
              src={item.logo?.url}
              width={120}
            />
          </div>
          <div className="actions">
            <Space style={{ width: '100%' }}>
              <Button
                block
                icon={<ShareAltOutlined />}
                shape="round"
                type="primary"
              />
              <Button block shape="round" type="primary">
                {item?.pricePerMonth
                  ? `${item?.pricePerMonth} ${item?.currency}`
                  : 'Free'}
              </Button>
            </Space>
          </div>
        </div>
      </div>

      <ListSection
        items={item?.activitiesCollection?.items}
        title={'Activities'}
        titleIcon={<PlusCircleOutlined />}
      />

      <ListSection
        items={item?.areasCollection?.items}
        title={'Areas'}
        titleIcon={<PlusCircleOutlined />}
      />

      <TextSection
        text={item?.description}
        title={'About'}
        titleIcon={<PlusCircleOutlined />}
      />

      <SocialIcons items={socials} />

      {item?.actionsCollection?.items?.map((action, i) => (
        <CallToAction key={`action-${i}`} showLeaveModal {...action} />
      ))}
    </div>
  )
}
