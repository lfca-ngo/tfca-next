require('./bankDetails.less')

import { ShareAltOutlined } from '@ant-design/icons'
import { Button, Divider, Space } from 'antd'
import Image from 'next/image'
import React from 'react'

import CallToAction from '../CallToAction'
import { ListSection, TextSection } from '../Sections'

export const BankDetails = ({ item, onNext }) => {
  return (
    <div className="detail-view bank">
      <header>
        <div className="logo">
          <div className="logo-wrapper">
            <Image height={175} src={item?.logo?.url} width={331} />
          </div>
        </div>

        <div className="tags">
          {item.tagsCollection?.items?.map((tag, i) => (
            <div className="tag-wrapper" key={`tag-${i}`}>
              <Image height={28} src={tag?.icon?.url} width={49} />
            </div>
          ))}
        </div>

        <div className="actions">
          <Space align="center">
            <CallToAction
              block
              onCountMeIn={onNext}
              shape="round"
              showLeaveModal
              text={`Visit ${item.name}`}
              type="primary"
              url={item.referralUrl}
            />

            <Button
              block
              icon={<ShareAltOutlined />}
              shape="round"
              type="primary"
            />
          </Space>
        </div>
      </header>

      <Divider />

      <ListSection items={item.benefitsCollection?.items} title="Benefits" />
      <ListSection
        items={item.sustainabilityCollection?.items}
        title="Sustainability"
      />
      <TextSection text={item?.description} title={`About ${item?.name}`} />
    </div>
  )
}
