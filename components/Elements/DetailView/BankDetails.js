require('./bankDetails.less')

import { Divider, Space } from 'antd'
import Image from 'next/image'
import React from 'react'

import { textBlockToString } from '../../../utils'
import { CallToAction } from '../CallToAction'
import { ListSection, TextSection } from '../Sections'

export const BankDetails = ({ actionId, blocks, item, onNext }) => {
  return (
    <div className="detail-view bank">
      <header>
        <div className="logo">
          <div className="logo-wrapper">
            <Image height={175} src={item?.logo?.url} width={331} />
          </div>
        </div>

        <div className="tags">
          {item.tags?.map((tag, i) => (
            <div className="tag-wrapper" key={`tag-${i}`}>
              <Image height={28} src={tag?.icon?.url} width={49} />
            </div>
          ))}
        </div>

        <div className="actions">
          <Space align="center">
            <CallToAction
              actionId={actionId}
              block
              onCountMeIn={onNext}
              shape="round"
              showLeaveModal
              text={textBlockToString(blocks['details.button.primary'], {
                name: item.name,
              })}
              type="primary"
              url={item.referralUrl}
            />
          </Space>
        </div>
      </header>

      <Divider />

      <ListSection
        items={item.benefits}
        title={textBlockToString(blocks['label.benefits'])}
      />
      <ListSection
        items={item.sustainability}
        title={textBlockToString(blocks['label.sustainability'])}
      />
      <TextSection
        text={item?.description}
        title={textBlockToString(blocks['label.about'])}
      />
    </div>
  )
}
