require('./energyProviderDetails.less')

import { ShareAltOutlined } from '@ant-design/icons'
import { Button, Divider, Space } from 'antd'
import Image from 'next/image'
import React from 'react'

import { text } from '../../../utils/Text'
import CallToAction from '../CallToAction'
import { TextSection } from '../Sections'

export const EnergyProviderDetails = ({ actionId, blocks, item, onNext }) => {
  return (
    <div className="detail-view energy-provider">
      <header>
        <div className="logo">
          <div className="logo-wrapper">
            <Image height={175} src={item?.logo?.url} width={331} />
          </div>
        </div>

        <div className="actions">
          <Space align="center">
            <CallToAction
              actionId={actionId}
              block
              onCountMeIn={onNext}
              shape="round"
              showLeaveModal
              text={text(blocks['details.button.primary'], { name: item.name })}
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

      <TextSection
        text={item?.description}
        title={text(blocks['label.description'])}
      />
    </div>
  )
}
