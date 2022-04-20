require('./organizationDetails.less')

import {
  BuildOutlined,
  HeartOutlined,
  InfoCircleOutlined,
  PlayCircleOutlined,
} from '@ant-design/icons'
import { Divider, Space, Tag } from 'antd'
import Image from 'next/image'
import React from 'react'

import { textBlockToString } from '../../../utils'
import { CallToAction } from '../CallToAction'
import { ListSection, TextSection } from '../Sections'
import { SocialIcons } from '../SocialIcons'

export const OrganizationDetails = ({ actionId, blocks, item, onNext }) => {
  const socials = [
    { id: 'Facebook', url: item.facebook },
    { id: 'Instagram', url: item.instagram },
    { id: 'Twitter', url: item.twitter },
    { id: 'Web', url: item.website },
  ]

  return (
    <div className="detail-view organization">
      <header>
        <div className="logo-wrapper">
          <Image layout="fill" objectFit="contain" src={item.logo?.url} />
        </div>

        <div className="content">
          <div className="title">{item.name}</div>
          <div className="description">{item.shortDescription}</div>
          <div className="vetted-by">
            {item?.vettedBy?.map((item, i) => (
              <Tag className="vetted-by-org" key={`vetted-${i}`}>
                <Image
                  height={24}
                  layout="fixed"
                  src={item?.icon?.url}
                  width={24}
                />
                {textBlockToString(item?.value)}
              </Tag>
            ))}
          </div>
        </div>
      </header>

      <Divider />

      <TextSection
        text={item?.description}
        title={textBlockToString(blocks['details.description.label'])}
        titleIcon={<InfoCircleOutlined />}
      />

      <Divider />

      <ListSection
        items={item?.activities}
        title={textBlockToString(blocks['details.activities.label'])}
        titleIcon={<PlayCircleOutlined />}
      />

      <Divider />

      <ListSection
        items={item?.areas}
        title={textBlockToString(blocks['details.areas.label'])}
        titleIcon={<BuildOutlined />}
      />

      <Divider />

      <ListSection
        items={item?.needs}
        title={textBlockToString(blocks['details.needs.label'])}
        titleIcon={<HeartOutlined />}
      />

      <Divider />

      <div className="socials">
        <SocialIcons items={socials} />
      </div>

      <Divider />

      <Space direction="vertical" style={{ width: '100%' }}>
        {item?.actions?.map((action, i) => (
          <CallToAction
            actionId={actionId}
            data-testid="organization-details-cta-btn"
            key={`action-${i}`}
            onCountMeIn={onNext}
            showLeaveModal
            {...action}
            block
            ghost={false}
          />
        ))}
      </Space>
    </div>
  )
}
